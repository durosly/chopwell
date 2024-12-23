import darkLogo from "@/public/images/chopwell-logo-dark.png";
import Image from "next/image";

function NotAvailable() {
	return (
		<div className="not-available h-screen min-[501px]:flex justify-center items-center overflow-y-hidden">
			<div>
				<div className="w-full aspect-video">
					<Image src={darkLogo} fill className="object-contain" alt="chopwell dark logo" />
				</div>
				<div className="text-center">
					<h1 className="text-3xl font-bold">Chopwell is not available for your current screen size</h1>
					<p className="text-xs text-base-200">contact kitchen@chopwellng.com for more info</p>
				</div>
			</div>
		</div>
	);
}

export default NotAvailable;
