import darkLogo from "@/public/images/chopwell-logo-dark.png";
import Image from "next/image";

function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="h-screen flex justify-center items-center overflow-y-hidden">
			<div className="w-full aspect-video">
				<Image src={darkLogo} fill className="object-contain animate-pulse" alt="chopwell dark logo" />
			</div>
		</div>
	);
}

export default Loading;
