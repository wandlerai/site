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
	serverExternalPackages: ["@huggingface/transformers", "onnxruntime-node"],
};

export default config;
