import NavLink from "@/app/_components/nav-link";
import IconCart from "@/icons/cart";
import IconDiscover from "@/icons/discover";
import IconHeart from "@/icons/heart";
import IconUser from "@/icons/user";

function BottomNav() {
	return (
		<>
			<div className="mt-20 sm:hidden">&nbsp;</div>

			<div className="dock sm:hidden">
				<NavLink
					className=""
					activeClassName="text-primary dock-active"
					path="/">
					<IconDiscover className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						discover
					</span>
				</NavLink>

				<NavLink
					className=""
					activeClassName="text-primary dock-active"
					path={"/browse"}>
					<IconCart className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						Browse
					</span>
				</NavLink>

				<NavLink
					className=""
					activeClassName="text-primary dock-active"
					path={"/user/favourites"}>
					<IconHeart className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						Favourites
					</span>
				</NavLink>

				<NavLink
					className=""
					activeClassName="text-primary dock-active"
					path="/user">
					<IconUser className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">Me</span>
				</NavLink>
			</div>
		</>
	);
}

export default BottomNav;
