import NavLink from "@/app/_components/nav-link";
import IconCart from "@/icons/cart";
import IconDiscover from "@/icons/discover";
import IconHeart from "@/icons/heart";
import IconUser from "@/icons/user";

function BottomNav() {
	return (
		<nav className="sm:hidden sticky bottom-0 left-0 right-0 bg-base-100 py-3 px-10 border-t">
			<ul className="flex justify-between items-center px-2">
				<li>
					<NavLink
						className="flex flex-col items-center text-[#797373]"
						activeClassName="text-primary"
						path="/">
						<IconDiscover className="w-8 h-8" />
						<span className="text-xs capitalize">discover</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="flex flex-col items-center text-[#797373]"
						activeClassName="text-primary"
						path={"/browse"}>
						<IconCart className="w-8 h-8" />
						<span className="text-xs capitalize">Browse</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="flex flex-col items-center text-[#797373]"
						activeClassName="text-primary"
						path={"/favourites"}>
						<IconHeart className="w-8 h-8" />
						<span className="text-xs capitalize">
							Favourites
						</span>
					</NavLink>
				</li>
				<li>
					<NavLink
						className="flex flex-col items-center text-[#797373]"
						activeClassName="text-primary"
						path="/user">
						<IconUser className="w-8 h-8" />
						<span className="text-xs capitalize ">Me</span>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default BottomNav;
