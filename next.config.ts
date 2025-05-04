import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./loader.ts",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.daisyui.com",
				port: "",
				pathname: "/images/**",
				search: "",
			},
			{
				protocol: "https",
				hostname: "s3.tebi.io",
				port: "",
				pathname: `/chopwell-test/**"`,
				search: "",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: `/**"`,
				search: "",
			},
		],
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
	productionBrowserSourceMaps: true, // 👈 enable source maps in production
};

export default nextConfig;
