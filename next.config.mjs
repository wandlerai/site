/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "5xvkmufwzznj1ey2.public.blob.vercel-storage.com",
				port: "",
				pathname: "/**",
			},
		],
	},

	// External packages that should not be bundled
	serverExternalPackages: ["onnxruntime-node", "@huggingface/transformers"],

	// Override the default webpack configuration
	webpack: (config, { isServer }) => {
		// Ignore node-specific modules when bundling for the browser
		// See https://webpack.js.org/configuration/resolve/#resolvealias
		config.resolve.alias = {
			...config.resolve.alias,
			sharp$: false,
			"onnxruntime-node$": false,
			"onnxruntime-node/bin": false,
			"onnxruntime-node/bin/napi-v3/linux": false,
			"onnxruntime-node/bin/napi-v3/win32": false,
			"onnxruntime-node/bin/napi-v3/darwin": false,
		};

		// Add specific handling for the server bundle
		if (isServer) {
			// Ensure onnxruntime-node is not included in the server bundle
			config.externals = [
				...(config.externals || []),
				"onnxruntime-node",
				"@huggingface/transformers",
			];
		}

		return config;
	},
};

export default config;
