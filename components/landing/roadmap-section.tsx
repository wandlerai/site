import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoadmapItem {
	title: string;
	status: "done" | "current" | "upcoming";
	description?: string;
}

interface RoadmapSectionProps {
	className?: string;
}

const roadmapItems: RoadmapItem[] = [
	{
		title: "loadModel",
		status: "done",
		description: "load any onnx model directly in your browser",
	},
	{
		title: "generateText",
		status: "done",
		description: "generate text with any llm",
	},
	{
		title: "streamText",
		status: "done",
		description: "stream text with any llm",
	},
	{
		title: "webworker",
		status: "done",
		description: "run models in a separate thread for better performance",
	},
	{
		title: "e2e tests",
		status: "current",
		description: "comprehensive testing suite for all features",
	},
	{
		title: "useChat",
		status: "upcoming",
		description: "react hooks for chat interfaces",
	},
	{
		title: "chat demo",
		status: "upcoming",
		description: "simple chat ui leveraging useChat",
	},
	{
		title: "auto-generated docs",
		status: "upcoming",
		description: "workflow that generates the docs based on the lib",
	},
	{
		title: "model hub",
		status: "upcoming",
		description: "browse compatible models and try them out",
	},
	{
		title: "generateImage",
		status: "upcoming",
		description: "stable diffusion in your browser",
	},
	{
		title: "generateAudio",
		status: "upcoming",
		description: "text-to-speech and music generation",
	},
];

export function RoadmapSection({ className }: RoadmapSectionProps) {
	return (
		<section className={cn("relative bg-black w-full overflow-x-hidden", className)}>
			<div className="absolute inset-0 bg-black">
				<div className="absolute inset-0 bg-noise"></div>
			</div>
			<div className="h-[50vh] w-full relative z-10 flex items-end border-l-[300px] border-primary/40 border-dash-dense">
				{/* Top line pattern */}
				<div className="absolute top-0 left-4 right-0 h-[45px] bg-[repeating-linear-gradient(90deg,theme(colors.primary.DEFAULT),theme(colors.primary.DEFAULT)_15px,transparent_15px,transparent_30px)] opacity-60"></div>
				<div className="w-full">
					<h2 className="text-[10vw] text-left font-black mb-0 text-primary tracking-tight uppercase relative container leading-[0.75] bg-transparent">
						roadmap
					</h2>
				</div>
			</div>

			<div className="h-[50vh] w-full relative z-10 border-l-[300px] border-secondary/40 overflow-y-auto">
				<div className="py-8 px-4">
					<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12">
						{roadmapItems.map((item, index) => (
							<div
								key={index}
								className={cn(
									"relative p-6 border-2",
									item.status === "done" && "border-[#0ff] text-[#0ff]/60",
									item.status === "current" &&
										"border-primary bg-primary/20 text-white animate-border-pulse",
									item.status === "upcoming" && "border-white/10 text-white/40"
								)}
							>
								<div className="flex items-center gap-4">
									<div
										className={cn(
											"w-4 h-4 rounded-full flex items-center justify-center",
											item.status === "done" && "bg-[#0ff]",
											item.status === "current" && "bg-primary",
											item.status === "upcoming" && "bg-black border border-white/10"
										)}
									>
										{item.status === "done" && <Check className="w-3 h-3 text-black" />}
										{item.status === "current" && <div className="w-2 h-2 rounded-full bg-white" />}
									</div>
									<h3
										className={cn(
											"text-lg font-medium",
											item.status === "done" && "text-[#0ff]",
											item.status === "current" && "text-white",
											item.status === "upcoming" && "text-white/40"
										)}
									>
										{item.title}
									</h3>
								</div>
								<p
									className={cn(
										"mt-2",
										item.status === "done" && "text-[#0ff]/60",
										item.status === "current" && "text-white/80",
										item.status === "upcoming" && "text-white/40"
									)}
								>
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
