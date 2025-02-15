"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Twitter } from "lucide-react";

export function Header() {
	const pathname = usePathname();
	const [hash, setHash] = useState("");

	useEffect(() => {
		setHash(window.location.hash);
		const handleHashChange = () => setHash(window.location.hash);
		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	const isActive = (path: string) => {
		if (path === "/docs") {
			return pathname.startsWith("/docs");
		}
		if (path === "/#models") {
			return pathname === "/" && hash === "#models";
		}
		return pathname === path;
	};

	return (
		<header
			className="fixed w-full z-50 border-b border-primary/20 backdrop-filter backdrop-blur-[40px]"
			style={{ backgroundColor: "#14171203" }}
		>
			<div className="container mx-auto flex justify-between items-center h-16 px-4">
				<div className="flex items-center">
					<Link href="/">
						<Image
							src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wandler_logo_v5-uKqhWv1iAk6ukQnEmbRLZ3Q2AChGxh.svg"
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
							href="/#models"
							className={`cyberpunk-nav-item ${isActive("/#models") ? "active" : ""}`}
						>
							Models
						</Link>
						<Link
							href="/docs"
							className={`cyberpunk-nav-item ${isActive("/docs") ? "active" : ""}`}
						>
							Docs
						</Link>
						<Link
							href="https://github.com/wandlerai/wandler"
							className="cyberpunk-nav-item"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</Link>
						<Link
							href="https://x.com/wandler_______"
							className="cyberpunk-nav-item"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Twitter className="w-4 h-4" />
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
