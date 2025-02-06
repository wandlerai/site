import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Wandler - Run ML Models in the Browser",
	description:
		"Democratize AI with Wandler, an open-source JavaScript library for running machine learning models directly in the browser.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={`${spaceGrotesk.className} bg-black text-white`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange
				>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
