/** @type {import('next').NextConfig} */
const config = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	serverExternalPackages: ["@huggingface/transformers"],
};

export default config;
