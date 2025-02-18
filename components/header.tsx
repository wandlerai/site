"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
	return (
		<header
			className="fixed w-full z-50 border-b border-primary/20 backdrop-filter backdrop-blur-[40px]"
			style={{ backgroundColor: "#14171203" }}
		>
			<div className="container mx-auto flex justify-between items-center h-16 px-4">
				<div className="flex items-center">
					<Link href="/">
						<Image
							src="https://5xvkmufwzznj1ey2.public.blob.vercel-storage.com/wandler_logo_v5-vJ2L3NmauebkFJs9fOcFe7bPVM14To.svg"
							alt="Wandler Logo"
							width={150}
							height={50}
							className="brightness-100"
						/>
					</Link>
				</div>
				<nav className="hidden md:block">
					<div className="cyberpunk-nav">
						<Link
							href="https://github.com/wandlerai/wandler"
							className="cyberpunk-nav-item flex items-center"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/github.svg"
								alt="GitHub"
								width={16}
								height={16}
								className="text-current invert"
							/>
						</Link>
						<Link
							href="https://bsky.app/profile/wandler.ai"
							className="cyberpunk-nav-item flex items-center"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/bluesky.svg"
								alt="Bluesky"
								width={16}
								height={16}
								className="text-current invert"
							/>
						</Link>
						<Link
							href="https://x.com/wandler_______"
							className="cyberpunk-nav-item flex items-center"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/x.svg"
								alt="X (Twitter)"
								width={16}
								height={16}
								className="text-current"
							/>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
