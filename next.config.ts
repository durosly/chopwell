import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
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
};

export default nextConfig;
