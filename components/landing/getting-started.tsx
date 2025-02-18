"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";
import type { BaseModel } from "wandler";
import { marked } from "marked";

interface GettingStartedProps {
	onRunCode: () => Promise<void>;
	isRunning: boolean;
}

interface LoadModelProgressInfo {
	status: string;
	file: string;
	loaded: number;
	total: number;
}

export function GettingStarted({ onRunCode, isRunning }: GettingStartedProps) {
	const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
	const [chatInput, setChatInput] = useState("");
	const [chatStatus, setChatStatus] = useState("");
	const [chatModel, setChatModel] = useState<BaseModel | null>(null);
	const chatRef = useRef<HTMLDivElement>(null);

	const loadChatModel = async () => {
		try {
			setChatStatus("Loading model...");
			const { loadModel } = await import("wandler");
			const model = await loadModel("onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX", {
				onProgress: (info: LoadModelProgressInfo) => {
					if (info.status === "progress") {
						const mb = (info.loaded / (1024 * 1024)).toFixed(1);
						const total = (info.total / (1024 * 1024)).toFixed(1);
						const percent = ((info.loaded / info.total) * 100).toFixed(1);
						setChatStatus(`${info.file}: ${mb}MB / ${total}MB (${percent}%)`);
					}
				},
			});

			setChatModel(model);
			setChatStatus(`Running in ${model.provider === "worker" ? "Worker" : "Main"} thread`);
		} catch (error) {
			setChatStatus(
				`Error loading model: ${error instanceof Error ? error.message : String(error)}`
			);
		}
	};

	const handleSendMessage = async () => {
		if (!chatInput.trim() || !chatModel) return;

		const userMessage = chatInput.trim();
		setChatInput("");
		setMessages(prev => [...prev, { role: "user", content: userMessage }]);

		try {
			const { streamText } = await import("wandler");
			const newMessages = [...messages, { role: "user", content: userMessage }];
			let fullResponse = "";

			const result = await streamText({
				model: chatModel,
				messages: newMessages,
			});

			// Create a temporary message for streaming
			setMessages(prev => [...prev, { role: "assistant", content: "" }]);

			for await (const token of result) {
				fullResponse += token;
				// Update the last message with the current stream
				setMessages(prev => {
					const newMsgs = [...prev];
					newMsgs[newMsgs.length - 1].content = fullResponse;
					return newMsgs;
				});
				// Scroll to bottom
				if (chatRef.current) {
					chatRef.current.scrollTop = chatRef.current.scrollHeight;
				}
			}
		} catch (error) {
			setMessages(prev => [
				...prev,
				{
					role: "system",
					content: `Error: ${error instanceof Error ? error.message : String(error)}`,
				},
			]);
		}
	};

	const renderMessage = (content: string) => {
		try {
			const html = marked.parse(content);
			if (typeof html !== "string") {
				return content;
			}
			return html
				.replace(
					/<think>/g,
					'<div class="think-box mt-2 bg-primary/5 p-2 rounded text-primary/80 italic">🤔 '
				)
				.replace(/<\/think>/g, "</div>");
		} catch {
			return content;
		}
	};

	return (
		<section className="py-16 relative overflow-hidden border-b border-primary/20">
			<div className="absolute inset-0 bg-black">
				<div className="absolute inset-0 bg-noise"></div>
			</div>
			<div className="container mx-auto px-4 relative z-10">
				<div className="grid md:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-2xl font-semibold text-primary">Code Editor</h3>
							<Button
								onClick={onRunCode}
								className="bg-primary text-black hover:bg-primary/80"
								disabled={isRunning}
							>
								{isRunning ? (
									<>
										<div className="animate-spin mr-2">⚡</div>
										Running...
									</>
								) : (
									<>
										<Play className="w-4 h-4 mr-2" />
										Run Code
									</>
								)}
							</Button>
						</div>
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-2xl font-semibold text-primary">Chat Demo</h3>
							{!chatModel && (
								<Button
									onClick={loadChatModel}
									className="bg-primary text-black hover:bg-primary/80"
								>
									Load Model
								</Button>
							)}
						</div>
						<div className="flex h-[400px] flex-col rounded-lg border border-primary/20 bg-black/50">
							<div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatRef}>
								{chatStatus && (
									<div className="rounded-lg bg-muted/20 px-3 py-2 text-muted-foreground text-sm">
										{chatStatus}
									</div>
								)}
								{messages.map((msg, i) => (
									<div key={i} className="flex gap-3 text-sm">
										<div
											className={`rounded-lg px-3 py-2 ${
												msg.role === "user"
													? "bg-primary/10 text-primary ml-auto"
													: msg.role === "system"
													? "bg-red-500/10 text-red-500"
													: "bg-muted/50 text-muted-foreground"
											}`}
											dangerouslySetInnerHTML={{
												__html: renderMessage(msg.content),
											}}
										/>
									</div>
								))}
							</div>
							<div className="border-t border-primary/20 p-4">
								<div className="flex gap-3">
									<Input
										className="flex-1 bg-black/50 border-primary/20"
										placeholder={chatModel ? "Type your message..." : "Load model to start chat..."}
										value={chatInput}
										onChange={e => setChatInput(e.target.value)}
										onKeyPress={e => e.key === "Enter" && handleSendMessage()}
										disabled={!chatModel}
									/>
									<Button
										onClick={handleSendMessage}
										disabled={!chatModel || !chatInput.trim()}
										className="bg-primary text-black hover:bg-primary/80"
									>
										Send
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
