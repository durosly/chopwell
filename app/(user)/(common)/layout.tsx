import lightLogo from "@/public/images/chopwell-logo-white.png";
import darkLogo from "@/public/images/chopwell-logo-dark.png";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./_components/search-bar";
import {
	LuAlignLeft,
	LuChevronDown,
	LuHandshake,
	LuLayers,
	LuOctagonAlert,
	LuShieldAlert,
	LuShoppingCart,
	LuUserCheck,
	LuX,
} from "react-icons/lu";
import IconUser from "@/icons/user";
import IconHeart from "@/icons/heart";
import IconTruck from "@/icons/truck";
import IconNotification from "@/icons/notification";
import IconWallet from "@/icons/wallet";
import IconCart from "@/icons/cart";
import CartCount from "./_components/cart-count";
import LoadCart from "./_components/load-cart";
import BottomNavWrapper from "./_components/bottom-nav-wrapper";
import { auth } from "@/auth";
import LogoutButton from "@/app/_components/logout-btn";
import HydrateCartIds from "./_components/hydrate-cart-ids";
import NotificationCountLoader from "./_components/notification-count-loader";
import PopupCartModal from "./_components/popup-cart-modal";
async function CommonLayout({ children }: { children: React.ReactNode }) {
	const session = await auth();

	// TODO: hydrate cart(ids) to load faster

	// TODO: hydrate fav(ids) to laod faster

	return (
		<>
			{/* <header className="bg-primary flex items-center justify-between gap-5 px-2 py-1"></header> */}

			<div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col">
					<div className="max-w-[1400px] w-full mx-auto">
						{/* Navbar */}
						<div className="sticky top-0 z-50 navbar justify-between bg-primary py-4 mb-5">
							<div className="flex-none lg:hidden">
								<label
									htmlFor="my-drawer-3"
									aria-label="open sidebar"
									className="btn btn-square btn-ghost text-primary-content">
									<LuAlignLeft className="inline-block h-6 w-6 stroke-current" />
								</label>
							</div>
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
								<Link
									className="relative text-primary-content"
									href="/cart">
									<LuShoppingCart className="w-6 h-6" />
									<CartCount />
								</Link>
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
													session
														.user
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
													href={`/favourites`}>
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
						<div className="max-sm:hidden ">
							<footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
								<nav>
									<h6 className="footer-title">
										Services
									</h6>
									<a className="link link-hover">
										Branding
									</a>
									<a className="link link-hover">
										Design
									</a>
									<a className="link link-hover">
										Marketing
									</a>
									<a className="link link-hover">
										Advertisement
									</a>
								</nav>
								<nav>
									<h6 className="footer-title">
										Company
									</h6>
									<a className="link link-hover">
										About us
									</a>
									<a className="link link-hover">
										Contact
									</a>
									<a className="link link-hover">
										Jobs
									</a>
									<a className="link link-hover">
										Press kit
									</a>
								</nav>
								<nav>
									<h6 className="footer-title">
										Legal
									</h6>
									<a className="link link-hover">
										Terms of use
									</a>
									<a className="link link-hover">
										Privacy policy
									</a>
									<a className="link link-hover">
										Cookie policy
									</a>
								</nav>
							</footer>
							<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
								<aside className="">
									<div className="relative h-7 w-20">
										<Image
											src={
												darkLogo
											}
											fill
											className="object-contain"
											alt="chopwell"
											sizes="80px"
										/>
									</div>
									<p>
										ACME Industries Ltd.
										<br />
										Providing reliable
										tech since 1992
									</p>
								</aside>
								<nav className="md:place-self-center md:justify-self-end">
									<div className="grid grid-flow-col gap-4">
										<a>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												className="fill-current">
												<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
											</svg>
										</a>
										<a>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												className="fill-current">
												<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
											</svg>
										</a>
										<a>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="24"
												height="24"
												viewBox="0 0 24 24"
												className="fill-current">
												<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
											</svg>
										</a>
									</div>
								</nav>
							</footer>
						</div>
					</div>
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
							{/* Sidebar content here */}
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
			</div>
		</>
	);
}

export default CommonLayout;
