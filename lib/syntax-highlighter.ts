import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>>;

export async function highlight(code: string, lang: string, showLineNumbers = false) {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ["github-dark"],
			langs: ["typescript", "javascript", "bash", "json", "markdown", "yaml", "tsx", "jsx"],
		});
	}

	try {
		const html = highlighter.codeToHtml(code, {
			lang,
			theme: "github-dark",
		});

		if (!showLineNumbers) return html;

		// Add line numbers by wrapping each line in a table row
		const lines = code.split("\n");
		const lineNumbersHtml = lines
			.map(
				(_, i) => `<span class="table-cell pr-4 text-muted-foreground select-none">${i + 1}</span>`
			)
			.join("\n");
		const codeHtml = html
			.replace(/<pre[^>]*><code[^>]*>/, "")
			.replace(/<\/code><\/pre>$/, "")
			.split("\n")
			.map(line => `<span class="table-cell">${line}</span>`)
			.join("\n");

		return `<pre class="font-mono text-sm"><code class="grid">${lines
			.map(
				(_, i) =>
					`<span class="table-row">${lineNumbersHtml.split("\n")[i]}${
						codeHtml.split("\n")[i]
					}</span>`
			)
			.join("\n")}</code></pre>`;
	} catch {
		// Fallback to plain text if language is not supported
		return highlighter.codeToHtml(code, {
			lang: "txt",
			theme: "github-dark",
		});
	}
}
