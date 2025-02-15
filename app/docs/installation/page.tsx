import { readFileSync } from "fs";
import { join } from "path";
import { getMdxContent } from "@/lib/mdx";

export default async function InstallationPage() {
	const source = readFileSync(join(process.cwd(), "app/docs/installation/page.mdx"), "utf-8");
	const content = await getMdxContent(source);

	return content;
}
