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
	webpack: config => {
		// Ignore node-specific modules when bundling for the browser
		// See https://webpack.js.org/configuration/resolve/#resolvealias
		config.resolve.alias = {
			...config.resolve.alias,
			sharp$: false,
			"onnxruntime-node$": false,
		};
		return config;
	},
};

export default config;
