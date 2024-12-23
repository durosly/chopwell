import lightLogo from "@/public/images/chopwell-logo-white.png";
import Image from "next/image";
import Link from "next/link";

export default function HeaderLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<header className="bg-primary flex items-center justify-between gap-5 px-2 py-1">
				<div className="relative h-10 w-[100px]">
					<Image src={lightLogo} fill alt="chopwell light logo" className="object-contain" />
				</div>
				<div className="space-x-2">
					<Link className="btn btn-sm btn-secondary" href="/signup">
						Join Now
					</Link>
					<Link className="btn btn-sm btn-w-outline" href="/login">
						Log in
					</Link>
				</div>
			</header>
			{children}
		</>
	);
}
