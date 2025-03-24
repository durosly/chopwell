"use client";

export default function myImageLoader({ src, width, quality }: { src: string; width: number; quality: number }) {
	//   return `https://example.com/${src}?w=${width}&q=${quality || 75}`

	if (src.includes("https://picsum.photos")) {
		return `${src}/${width}`;
	}

	return `${src}?w=${width}&q=${quality || 75}`;
}
