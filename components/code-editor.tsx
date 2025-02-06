import React from "react";

interface CodeEditorProps {
	code: string;
	language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language }) => {
	return (
		<div className="cyberpunk-corners bg-black/50 p-4 overflow-auto border border-primary/50">
			<pre className="text-primary font-mono text-sm">
				<code>{code}</code>
			</pre>
		</div>
	);
};

export default CodeEditor;
