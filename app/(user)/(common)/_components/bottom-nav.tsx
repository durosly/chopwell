import NavLink from "@/app/_components/nav-link";
// import IconCart from "@/icons/cart";
import IconDiscover from "@/icons/discover";
import IconHeart from "@/icons/heart";
import IconTruck from "@/icons/truck";
import IconUser from "@/icons/user";
import { LuLayoutList } from "react-icons/lu";

function BottomNav() {
	return (
		<>
			<div className="mt-20 sm:hidden">&nbsp;</div>

			<div className="dock sm:hidden">
				<NavLink exact activeClassName="text-primary dock-active" path="/">
					<IconDiscover className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize text-transparent">
						discover
					</span>
				</NavLink>
				<NavLink
					exact
					activeClassName="text-primary dock-active"
					path="/categories">
					<LuLayoutList className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						AZ Menu
					</span>
				</NavLink>

				{/* <NavLink
					activeClassName="text-primary dock-active"
					path={"/browse"}>
					<IconCart className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						Browse
					</span>
				</NavLink> */}

				<NavLink
					activeClassName="text-primary dock-active"
					path={"/user/favourites"}>
					<IconHeart className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						Favourites
					</span>
				</NavLink>
				<NavLink
					activeClassName="text-primary dock-active"
					path={"/user/orders"}>
					<IconTruck className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">
						Orders
					</span>
				</NavLink>

				<NavLink activeClassName="text-primary dock-active" path="/user">
					<IconUser className="size-[1.2em]" />
					<span className="docker-label text-xs capitalize">Me</span>
				</NavLink>
			</div>
		</>
	);
}

export default BottomNav;
