import lightLogo from "@/public/images/chopwell-logo-white.png";
import darkLogo from "@/public/images/chopwell-logo-dark.png";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./_components/search-bar";
import {
	// LuAlignLeft,
	LuChevronDown,
	// LuHandshake,
	// LuLayers,
	LuLayoutGrid,
	// LuOctagonAlert,
	// LuShieldAlert,
	// LuShoppingCart,
	LuUserCheck,
	// LuX,
	LuLink,
	LuBuilding,
	LuShield,
} from "react-icons/lu";
import IconUser from "@/icons/user";
import IconHeart from "@/icons/heart";
import IconTruck from "@/icons/truck";
import IconNotification from "@/icons/notification";
import IconWallet from "@/icons/wallet";
// import IconCart from "@/icons/cart";
// import CartCount from "./_components/cart-count";
import { SessionProvider } from "next-auth/react";
import LoadCart from "./_components/load-cart";
import BottomNavWrapper from "./_components/bottom-nav-wrapper";
import { auth } from "@/auth";
import LogoutButton from "@/app/_components/logout-btn";
import HydrateCartIds from "./_components/hydrate-cart-ids";
import NotificationCountLoader from "./_components/notification-count-loader";
import PopupCartModal from "./_components/popup-cart-modal";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";

async function CommonLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	return (
		<SessionProvider>
			{/* <header className="bg-primary flex items-center justify-between gap-5 px-2 py-1"></header> */}

			<div className="max-w-[1400px] w-full mx-auto">
				{/* Navbar */}
				<div className="sticky top-0 z-50 navbar justify-between bg-primary py-4 mb-5">
					{/* <div className="flex-none lg:hidden">
								<label
									htmlFor="my-drawer-3"
									aria-label="open sidebar"
									className="btn btn-square btn-ghost text-primary-content">
									<LuAlignLeft className="inline-block h-6 w-6 stroke-current" />
								</label>
							</div> */}
					<div className="mx-2 px-2">
						<Link
							href="/"
							className="block relative h-10 w-[100px]">
							<Image
								src={lightLogo}
								fill
								alt="chopwell light logo"
								className="object-contain"
								sizes="100px"
							/>
						</Link>
					</div>
					<SearchBar
						showSubmitBtn
						direction="row"
						isHeader={true}
						inputClassName="bg-base-100 border-none rounded !outline-none min-w-[400px]"
						btnClassName="bg-base-100 text-primary hover:bg-base-100/90"
						parentClassName="max-lg:hidden"
					/>
					<div className="flex items-center gap-5">
						<div className="hidden flex-none lg:flex items-center">
							<ul className="menu menu-horizontal text-primary-content">
								{/* Navbar menu content here */}
								<li>
									<Link href="/browse">
										Browse
									</Link>
								</li>
								<li>
									<Link href="/categories">
										Categories
									</Link>
								</li>
							</ul>
						</div>
						{/* <Link
									className="relative text-primary-content"
									href="/cart">
									<LuShoppingCart className="w-6 h-6" />
									<CartCount />
								</Link> */}
						{session?.user ? (
							<div className="dropdown dropdown-end">
								<div
									tabIndex={0}
									role="button"
									className="btn btn-sm btn-ghost hover:bg-transparent flex-nowrap text-primary-content">
									<LuUserCheck className="w-6 h-6" />
									<span className="max-sm:hidden text-nowrap">
										Hi,{" "}
										{
											session.user
												.firstname
										}
									</span>
									<LuChevronDown className="w-5 h-5" />
								</div>
								<ul
									tabIndex={0}
									className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
									<li className="sm:hidden">
										<span className="font-bold">
											Hi,{" "}
											{
												session
													.user
													.firstname
											}
										</span>
									</li>
									<li>
										<Link href="/user">
											<IconUser className="w-6 h-6" />{" "}
											Profile
										</Link>
									</li>
									<li>
										<Link href="/user/notifications">
											<IconNotification className="w-6 h-6" />{" "}
											Notification
											<NotificationCountLoader />
										</Link>
									</li>
									<li>
										<Link href="/user/wallet">
											<IconWallet className="w-6 h-6" />
											Wallet
										</Link>
									</li>
									<li>
										<Link
											href={`/user/favourites`}>
											<IconHeart className="w-6 h-6" />{" "}
											Favourites
										</Link>
									</li>
									<li>
										<Link href="/user/orders">
											<IconTruck className="w-6 h-6" />
											Orders
										</Link>
									</li>
									{session.user.is_admin && (
										<li>
											<Link href="/dashboard">
												<LuLayoutGrid className="w-6 h-6" />
												Dashboard
											</Link>
										</li>
									)}
									<li className="mt-2">
										<LogoutButton className="btn btn-sm btn-error">
											Logout
										</LogoutButton>
									</li>
								</ul>
							</div>
						) : (
							<div className="space-x-2">
								<Link
									className="btn btn-sm btn-primary"
									href="/signup">
									Join Now
								</Link>
								<Link
									className="btn btn-sm btn-secondary"
									href="/login">
									Log in
								</Link>
							</div>
						)}
					</div>
				</div>

				<SearchBar
					parentClassName="lg:hidden w-full mb-5"
					inputClassName="w-full"
				/>
				{/* Page content here */}
				<HydrateCartIds>
					<LoadCart />
				</HydrateCartIds>
				{children}
				<PopupCartModal />
				<BottomNavWrapper />
				<div className="">
					<footer className="footer flex flex-col md:flex-row justify-between items-start gap-8 bg-base-200 text-base-content border-t border-base-300 px-6 py-10 rounded-none">
						<div className="flex-1 min-w-[180px]">
							<div className="mb-4">
								<div className="relative h-8 w-28 mb-2">
									<Image
										src={darkLogo}
										fill
										className="object-contain"
										alt="chopwell"
										sizes="112px"
									/>
								</div>
								<p className="text-sm text-base-content/70 leading-relaxed">
									ACME Industries Ltd.
									<br />
									Providing reliable tech
									since 1992
								</p>
							</div>
							<div className="flex gap-3 mt-4">
								<a
									href="#"
									aria-label="Twitter"
									className="text-base-content/70 hover:text-primary transition-colors">
									<BsTwitter className="size-7" />
								</a>
								<a
									href="#"
									aria-label="Facebook"
									className="text-base-content/70 hover:text-primary transition-colors">
									<BsFacebook className="size-7" />
								</a>
								<a
									href="#"
									aria-label="Instagram"
									className="text-base-content/70 hover:text-primary transition-colors">
									<BsInstagram className="size-7" />
								</a>
							</div>
						</div>
						<div className="flex-1 min-w-[140px]">
							<h6 className="footer-title flex items-center gap-2 text-base-content/90 mb-2">
								<LuLink className="text-primary size-5" />{" "}
								Quick Links
							</h6>
							<ul className="space-y-1">
								<li>
									<Link
										href="/browse"
										className="link link-hover">
										Browse
									</Link>
								</li>
								<li>
									<Link
										href="/categories"
										className="link link-hover">
										Categories
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex-1 min-w-[140px]">
							<h6 className="footer-title flex items-center gap-2 text-base-content/90 mb-2">
								<LuBuilding className="text-primary size-5" />{" "}
								Company
							</h6>
							<ul className="space-y-1">
								<li>
									<Link
										href="/about-us"
										className="link link-hover">
										About us
									</Link>
								</li>
								<li>
									<Link
										href="/contact-us"
										className="link link-hover">
										Contact
									</Link>
								</li>
							</ul>
						</div>
						<div className="flex-1 min-w-[140px]">
							<h6 className="footer-title flex items-center gap-2 text-base-content/90 mb-2">
								<LuShield className="text-primary size-5" />{" "}
								Legal
							</h6>
							<ul className="space-y-1">
								<li>
									<Link
										href="/terms"
										className="link link-hover">
										Terms and conditions
									</Link>
								</li>
								<li>
									<Link
										href="/privacy"
										className="link link-hover">
										Privacy policy
									</Link>
								</li>
							</ul>
						</div>
					</footer>
					<div className="w-full text-center text-xs text-base-content/60 py-4 border-t border-base-300 bg-base-200">
						&copy; {new Date().getFullYear()} ACME Industries
						Ltd. All rights reserved.
					</div>
				</div>
			</div>
			{/* <div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col">
				</div>
				<div className="drawer-side z-50">
					<label
						htmlFor="my-drawer-3"
						aria-label="close sidebar"
						className="drawer-overlay"></label>
					<div className="relative menu bg-base-100 min-h-full w-80 p-4">
						<label
							htmlFor="my-drawer-3"
							aria-label="close sidebar"
							className="absolute top-1 right-1 btn btn-ghost z-10">
							<LuX className="w-4 h-4" />
						</label>
						<div className="relative h-14 w-full mb-5">
							<Image
								src={darkLogo}
								fill
								className="object-contain"
								alt="chopwell"
								sizes="198px"
							/>
						</div>
						<ul>
						
							<li>
								<Link href="/browse">
									<IconCart className="w-6 h-6" />
									Browse
								</Link>
							</li>
							<li>
								<Link href="/category">
									<LuLayers className="w-6 h-6" />
									Categories
								</Link>
							</li>
							<li>
								<Link href="/about">
									<LuHandshake className="w-6 h-6" />
									About us
								</Link>
							</li>
							<li>
								<Link href="/terms">
									<LuOctagonAlert className="w-6 h-6" />
									Terms and conditions
								</Link>
							</li>
							<li>
								<Link href="/terms">
									<LuShieldAlert className="w-6 h-6" />
									Privacy policy
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div> */}
		</SessionProvider>
	);
}

export default CommonLayout;
