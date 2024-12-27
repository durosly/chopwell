import IconCart from "@/icons/cart";
import IconDiscover from "@/icons/discover";
import IconHeart from "@/icons/heart";
import IconUser from "@/icons/user";
import Link from "next/link";

function BottomNav() {
	return (
		<nav className="sticky bottom-0 left-0 right-0 bg-base-100 py-3 border-t">
			<ul className="flex justify-between items-center px-2">
				<li>
					<Link className="flex flex-col items-center" href="/">
						<IconDiscover className="w-8 h-8" />
						<span className="text-xs capitalize text-[#797373]">discover</span>
					</Link>
				</li>
				<li>
					<Link className="flex flex-col items-center" href={"/"}>
						<IconCart className="w-8 h-8" />
						<span className="text-xs capitalize text-[#797373]">Browse</span>
					</Link>
				</li>
				<li>
					<Link className="flex flex-col items-center" href={"/"}>
						<IconHeart className="w-8 h-8" />
						<span className="text-xs capitalize text-[#797373]">Favourites</span>
					</Link>
				</li>
				<li>
					<Link className="flex flex-col items-center" href="/">
						<IconUser className="w-8 h-8" />
						<span className="text-xs capitalize text-[#797373]">Me</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
}

export default BottomNav;
