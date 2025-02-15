"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
	{
		title: "Getting Started",
		items: [
			{
				title: "Introduction",
				href: "/docs",
			},
			{
				title: "Installation",
				href: "/docs/installation",
			},
		],
	},
	{
		title: "Core Concepts",
		items: [
			{
				title: "Models",
				href: "/docs/models",
			},
			{
				title: "WebGPU",
				href: "/docs/webgpu",
			},
		],
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 border-r border-primary/20 bg-black fixed h-[calc(100vh-4rem)] top-16">
			<div className="overflow-y-auto h-full p-6">
				<nav className="space-y-8">
					{sidebarItems.map((section, i) => (
						<div key={i}>
							<h2 className="mb-4 text-lg font-semibold text-primary">{section.title}</h2>
							<ul className="space-y-2">
								{section.items.map((item, j) => (
									<li key={j}>
										<Link
											href={item.href}
											className={cn(
												"block py-1.5 text-sm transition-colors hover:text-primary",
												pathname === item.href
													? "text-primary font-medium"
													: "text-muted-foreground"
											)}
										>
											{item.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</div>
		</aside>
	);
}
