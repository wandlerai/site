"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
	Check,
	Copy,
	Lock,
	TextIcon,
	ImageIcon,
	AudioWaveform,
	Search,
	SlidersHorizontal,
	Code,
	Brain,
	Play,
	Book,
	Code2,
	FileCode,
	Server,
	PiggyBank,
	Microchip,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import type { BaseModel } from "wandler";

interface LandingPageProps {
	sampleCode: React.ReactNode;
}

export function LandingPage({ sampleCode }: LandingPageProps) {
	type PackageManager = "npm" | "yarn" | "pnpm";
	const [activeTab, setActiveTab] = useState<PackageManager>("npm");
	const [copied, setCopied] = useState(false);
	const [codeOutput, setCodeOutput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [model, setModel] = useState<BaseModel | null>(null);

	const installCommands: Record<PackageManager, string> = {
		npm: "npm install wandler",
		yarn: "yarn add wandler",
		pnpm: "pnpm add wandler",
	};

	const handleCopy = async () => {
		await navigator.clipboard.writeText(installCommands[activeTab]);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleRunCode = async () => {
		try {
			setIsLoading(true);
			setCodeOutput("Loading model...");

			// Dynamically import wandler only on the client side
			const { loadModel, generateText } = await import("wandler");

			if (!model) {
				const loadedModel = await loadModel("onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX", {
					onProgress: (info: {
						status: string;
						loaded?: number;
						total?: number;
						file?: string;
					}) => {
						if (info.status === "progress" && info.loaded && info.total && info.file) {
							const mb = (info.loaded / (1024 * 1024)).toFixed(1);
							const total = (info.total / (1024 * 1024)).toFixed(1);
							const percent = ((info.loaded / info.total) * 100).toFixed(1);
							const progress = `${info.file}: ${mb}MB / ${total}MB (${percent}%)`;

							// Update code output directly with all progress information
							setCodeOutput(prev => {
								const lines = prev.split("\n");
								const fileIndex = lines.findIndex(line => line.startsWith(info.file!));
								if (fileIndex !== -1) {
									lines[fileIndex] = progress;
								} else {
									if (lines[0] === "Loading model...") {
										lines.push(progress);
									} else {
										lines.unshift(progress);
									}
								}
								return lines.join("\n");
							});
						}
					},
				});
				setModel(loadedModel);
			}

			setCodeOutput("Generating text...");
			const result = await generateText({
				model,
				system: "You are a helpful assistant.",
				messages: [{ role: "user", content: "What is the capital of France?" }],
				temperature: 0.7,
				maxTokens: 100,
			});

			setCodeOutput(`Generated text: ${result}`);
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
			setCodeOutput(`Error: ${errorMessage}`);
			console.error("Generation error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-h-screen bg-black text-white">
			<Header />

			<main className="flex-grow pt-16">
				<section className="relative py-16 overflow-hidden border-b border-primary/20">
					<div className="container mx-auto px-4 relative z-10">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="space-y-8">
								<div>
									<h1 className="text-5xl font-bold tracking-tighter mb-4">
										Run AI Directly in Your Browser
									</h1>
									<p className="text-xl text-muted-foreground">
										what happens when you merge the{" "}
										<a href="https://sdk.vercel.ai" className="text-primary hover:underline">
											AI SDK
										</a>{" "}
										with{" "}
										<a
											href="https://huggingface.co/docs/transformers.js/en/index"
											className="text-primary hover:underline"
										>
											transformers.js
										</a>
										? welcome to wandler.
									</p>
								</div>
								<div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<PiggyBank className="w-4 h-4 text-primary" />
										Free
									</div>
									<div className="flex items-center gap-2">
										<Lock className="w-4 h-4 text-primary" />
										Private
									</div>
									<div className="flex items-center gap-2">
										<Server className="w-4 h-4 text-primary" />
										Local
									</div>
									<div className="flex items-center gap-2">
										<Code className="w-4 h-4 text-primary" />
										Open Source
									</div>
									<div className="flex items-center gap-2">
										<Microchip className="w-4 h-4 text-primary" />
										WebGPU
									</div>
								</div>

								<div className="cyberpunk-corners bg-secondary p-4">
									<div className="install-tabs">
										{Object.keys(installCommands).map(tab => (
											<div
												key={tab}
												className={`install-tab ${activeTab === tab ? "active" : ""}`}
												onClick={() => setActiveTab(tab as PackageManager)}
											>
												{tab}
											</div>
										))}
									</div>
									<div className="install-content flex justify-between items-center">
										<code>{installCommands[activeTab]}</code>
										<button
											onClick={handleCopy}
											className="p-2 hover:text-primary transition-colors"
											title="Copy to clipboard"
										>
											{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
										</button>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<Link href="/docs" className="button-cyber">
										Getting Started
									</Link>
									<Link
										href="/docs/models"
										className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded hover:bg-primary/10 transition-colors"
									>
										<Brain className="w-5 h-5" />
										<span>Use in your AI editor</span>
									</Link>
								</div>
							</div>

							<div className="relative flex justify-center">
								<div className="w-[500px] h-[500px] relative">
									<Image
										src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20250202_wandler_head_v2.jpg-jGMeYQEFw3vnaxzq5gf5KaisVdsxIW.jpeg"
										alt="AI and Human Integration"
										fill
										className="object-contain"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-16 relative overflow-hidden border-b border-primary/20 getting-started-section">
					<div className="absolute inset-0 bg-black">
						<div className="absolute inset-0 bg-noise"></div>
					</div>
					<div className="container mx-auto px-4 relative z-10">
						<h2
							className="text-4xl font-bold mb-8 text-center text-primary"
							data-text="Getting Started"
						>
							Getting Started
						</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div className="space-y-4">
								<h3 className="text-2xl font-semibold mb-4 text-primary">Code Editor</h3>
								{sampleCode}
								<Button
									onClick={handleRunCode}
									className="w-full bg-primary text-black hover:bg-primary/80 disabled:opacity-50"
									disabled={isLoading}
								>
									{isLoading ? (
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
							<div className="space-y-4">
								<h3 className="text-2xl font-semibold mb-4 text-primary">Output</h3>
								<div className="cyberpunk-corners bg-black/50 p-4 h-[300px] overflow-auto border border-primary/50">
									<pre className="text-primary font-mono text-sm">{codeOutput}</pre>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="models" className="py-16 relative">
					<div className="absolute inset-0 dot-pattern opacity-10"></div>
					<div className="container mx-auto px-4 relative z-10">
						<div className="flex flex-col gap-8">
							<div className="flex flex-wrap items-center justify-between gap-4">
								<h2 className="text-3xl font-bold">Explore Models</h2>
								<div className="flex gap-4">
									<div className="relative">
										<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
										<Input
											placeholder="Search models..."
											className="pl-9 bg-secondary border-primary/20 w-[200px]"
										/>
									</div>
									<Button variant="outline" className="border-primary/20">
										<SlidersHorizontal className="w-4 h-4 mr-2" />
										Filters
									</Button>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{[
									{
										name: "GPT-2 Small",
										type: "text",
										icon: TextIcon,
										provider: "HuggingFace",
										description: "Efficient text generation model",
										image: "/placeholder.svg?height=200&width=400",
									},
									{
										name: "ResNet-50",
										type: "image",
										icon: ImageIcon,
										provider: "ONNX",
										description: "Image classification model",
										image: "/placeholder.svg?height=200&width=400",
									},
									{
										name: "Whisper Small",
										type: "audio",
										icon: AudioWaveform,
										provider: "OpenAI",
										description: "Speech recognition model",
										image: "/placeholder.svg?height=200&width=400",
									},
									{
										name: "YOLO v8",
										type: "image",
										icon: ImageIcon,
										provider: "Ultralytics",
										description: "Object detection model",
										image: "/placeholder.svg?height=200&width=400",
									},
									{
										name: "Stable Diffusion",
										type: "image",
										icon: ImageIcon,
										provider: "StabilityAI",
										description: "Text-to-image generation",
										image: "/placeholder.svg?height=200&width=400",
									},
									{
										name: "Wav2Vec",
										type: "audio",
										icon: AudioWaveform,
										provider: "Meta",
										description: "Speech processing model",
										image: "/placeholder.svg?height=200&width=400",
									},
								].map(model => (
									<div key={model.name} className="cyberpunk-corners bg-secondary p-4 space-y-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<model.icon className="w-5 h-5 text-primary" />
												<h3 className="font-semibold">{model.name}</h3>
											</div>
											<span className="text-xs text-muted-foreground">{model.provider}</span>
										</div>
										<p className="text-sm text-muted-foreground">{model.description}</p>
										<Button variant="outline" className="w-full border-primary/20">
											Learn More
										</Button>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="py-24 bg-primary section-divider">
					<div className="container mx-auto px-4 py-8">
						<h2 className="text-6xl font-bold mb-12 text-center text-black">open ai 4 everyone</h2>
						<div className="grid md:grid-cols-2 gap-8 text-black">
							<div>
								<p className="text-lg mb-4">
									We believe that AI should be accessible to everyone, on their own terms, in any
									project. That&apos;s why we created Wandler. Open-source is the key to unlocking
									the full potential of AI technology. By making AI tools freely available and
									customizable, we empower developers, researchers, and innovators to push the
									boundaries of what&apos;s possible.
								</p>
							</div>
							<div>
								<p className="text-lg mb-4">
									Wandler is designed to be as easy and accessible as possible, allowing anyone to
									integrate powerful AI capabilities into their projects without compromising on
									privacy or flexibility. Join us in our mission to democratize AI and create a
									future where the power of artificial intelligence is in everyone&apos;s hands.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="docs" className="py-16 relative overflow-hidden border-b border-primary/20">
					<div className="absolute inset-0 bg-black">
						<div className="absolute inset-0 bg-noise"></div>
					</div>
					<div className="container mx-auto px-4 relative z-10">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div className="space-y-6">
								<h2 className="text-4xl font-bold text-primary">Documentation</h2>
								<p className="text-lg text-muted-foreground">
									Comprehensive guides and API references to help you integrate AI models into your
									applications with ease.
								</p>
								<div className="grid gap-4">
									<div className="flex items-start gap-4">
										<div className="p-2 bg-secondary rounded-md">
											<Book className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Getting Started Guide</h3>
											<p className="text-sm text-muted-foreground">
												Learn the basics and get your first AI model running in minutes.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="p-2 bg-secondary rounded-md">
											<Code2 className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">API Reference</h3>
											<p className="text-sm text-muted-foreground">
												Detailed documentation of all available methods and options.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="p-2 bg-secondary rounded-md">
											<FileCode className="w-6 h-6 text-primary" />
										</div>
										<div>
											<h3 className="font-semibold mb-1">Examples</h3>
											<p className="text-sm text-muted-foreground">
												Real-world examples and use cases to help you get started.
											</p>
										</div>
									</div>
								</div>
								<div className="flex gap-4">
									<Link href="/docs" className="button-cyber">
										View Documentation
									</Link>
									<Link
										href="/docs/installation"
										className="flex items-center gap-2 px-4 py-2 bg-secondary text-primary rounded hover:bg-primary/10 transition-colors"
									>
										<Code className="w-5 h-5" />
										<span>Installation Guide</span>
									</Link>
								</div>
							</div>
							<div className="relative">
								<div className="cyberpunk-corners bg-secondary p-6">{sampleCode}</div>
							</div>
						</div>
					</div>
				</section>

				<section className="w-screen h-screen bg-[#e41832] flex items-center justify-end p-20">
					<h1 className="text-[15vw] font-black text-white leading-none tracking-tighter text-right">
						DEMOCRATIZE AI
					</h1>
				</section>
			</main>

			<footer className="py-8 border-t border-primary/20">
				<div className="container mx-auto px-4 text-center text-muted-foreground">
					<p>&copy; 2025 Wandler. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
