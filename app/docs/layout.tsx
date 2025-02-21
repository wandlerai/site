"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Header } from "@/components/header";
import { cn } from "@/lib/utils";

const sidebarItems = [
	{
		title: "docs",
		items: [
			{
				title: "install",
				href: "/docs#install",
			},
			{
				title: "hello, world!",
				href: "/docs#hello-world",
			},
			{
				title: "core functions",
				href: "/docs#core-functions",
				items: [
					{
						title: "loadModel",
						href: "/docs#loadmodel",
					},
					{
						title: "generateText",
						href: "/docs#generatetext",
					},
					{
						title: "streamText",
						href: "/docs#streamtext",
					},
				],
			},
		],
	},
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col min-h-screen bg-black text-white">
			<Header />

			{/* Main content */}
			<div className="container mx-auto">
				<div className="flex pt-16">
					{/* Sidebar */}
					<Sidebar />

					{/* Main content */}
					<main className="flex-1 ml-64">
						<div className="max-w-3xl py-12 px-6">{children}</div>
					</main>
				</div>
			</div>
		</div>
	);
}

function Sidebar() {
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
										{item.items && (
											<ul className="ml-4 mt-2 space-y-1 border-l border-primary/20">
												{item.items.map((subItem, k) => (
													<li key={k}>
														<Link
															href={subItem.href}
															className={cn(
																"block py-1 text-sm transition-colors hover:text-primary",
																pathname === subItem.href
																	? "text-primary font-medium"
																	: "text-muted-foreground"
															)}
														>
															{subItem.title}
														</Link>
													</li>
												))}
											</ul>
										)}
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
