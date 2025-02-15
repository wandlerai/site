import { LandingPage } from "@/components/landing/landing-page";
import { CodeBlockServer } from "@/components/ui/code-block-server";
import { Suspense } from "react";

const sampleCode = `import { loadModel, generateText } from "wandler";

// Load the model (only needs to be done once)
const model = await loadModel("onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX", {
	onProgress: (info) => {
		if (info.status === "progress") {
			console.log(\`Loading: \${info.loaded}/\${info.total} bytes\`);
		}
	}
});

// Generate text
const result = await generateText({
	model,
	system: "You are a helpful assistant.",
	messages: [{ role: "user", content: "What is the capital of France?" }],
	temperature: 0.7,
	maxTokens: 100
});

console.log(result); // "The capital of France is Paris."`;

const streamingCode = `import { loadModel, streamText } from "wandler";

// Load the model (only needs to be done once)
const model = await loadModel("onnx-community/DeepSeek-R1-Distill-Qwen-1.5B-ONNX");

// Stream text with real-time responses
const { textStream } = await streamText({
	model,
	system: "You are a helpful assistant.",
	messages: [{ role: "user", content: "Tell me a story about a brave knight." }],
	temperature: 0.8,
	maxTokens: 500
});

// Process the stream
for await (const chunk of textStream) {
	console.log(chunk); // Each chunk of generated text
}`;

export default function Home() {
	return (
		<Suspense>
			<LandingPage
				sampleCode={
					<Suspense fallback={<div className="h-[300px] animate-pulse bg-secondary" />}>
						<CodeBlockServer code={sampleCode} language="typescript" />
					</Suspense>
				}
				classificationCode={
					<Suspense fallback={<div className="h-[300px] animate-pulse bg-secondary" />}>
						<CodeBlockServer code={streamingCode} language="typescript" />
					</Suspense>
				}
			/>
		</Suspense>
	);
}
