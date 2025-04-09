// import IconBrush from "@/icons/brush";
import IconHeart from "@/icons/heart";
import IconLock from "@/icons/lock";
import IconNote from "@/icons/note";
import IconNotification from "@/icons/notification";
import IconPhone2 from "@/icons/phone-2";
import IconTruck from "@/icons/truck";
import IconUser from "@/icons/user";
import IconWallet from "@/icons/wallet";
import Link from "next/link";
import BottomNav from "../_components/bottom-nav";
import LogoutModal from "./_components/logout-modal";
import { auth } from "@/auth";

async function UserPage() {
	const session = await auth();
	const username = session?.user.name;
	return (
		<>
			<div className="px-5 md:px-10 min-h-[100dvh]">
				<div className="max-w-4xl mx-auto">
					<div className="my-8 md:my-12">
						<h2 className="text-3xl md:text-4xl font-bold text-center text-base-content">
							My Account
						</h2>
					</div>
					<div className="flex flex-col items-center gap-6 mb-12">
						<div className="relative w-[120px] md:w-[150px] aspect-square rounded-full flex justify-center items-center border-2 border-base-200/20 bg-base-100">
							<IconUser className="w-12 h-12 md:w-16 md:h-16 text-primary" />

							{/* <button className="btn btn-circle btn-sm absolute bottom-0 -right-2 bg-primary text-primary-content hover:bg-primary-focus border-0">
								<IconBrush className="w-4 h-4" />
							</button> */}
						</div>
						<p className="text-base-content font-bold text-xl md:text-2xl">
							{username}
						</p>
					</div>

					<div className="flex gap-6 md:gap-12 justify-center items-start mb-12">
						<Link
							className="card w-24 h-24 md:w-32 md:h-32 bg-base-100 border-2 border-base-200/20 hover:border-base-200/40 transition-colors"
							href="/favourites">
							<div className="card-body items-center justify-center p-0">
								<IconHeart className="w-10 h-10 md:w-12 md:h-12 text-primary" />
								<span className="text-sm md:text-base font-medium capitalize text-base-content">
									Favourites
								</span>
							</div>
						</Link>
						<Link
							className="card w-24 h-24 md:w-32 md:h-32 bg-base-100 border-2 border-base-200/20 hover:border-base-200/40 transition-colors"
							href="/user/wallet">
							<div className="card-body items-center justify-center p-0">
								<IconWallet className="w-10 h-10 md:w-12 md:h-12 text-primary" />
								<span className="text-sm md:text-base font-medium capitalize text-base-content">
									Wallet
								</span>
							</div>
						</Link>
						<Link
							className="card w-24 h-24 md:w-32 md:h-32 bg-base-100 border-2 border-base-200/20 hover:border-base-200/40 transition-colors"
							href="/user/orders">
							<div className="card-body items-center justify-center p-0">
								<IconTruck className="w-10 h-10 md:w-12 md:h-12 text-primary" />
								<span className="text-sm md:text-base font-medium capitalize text-base-content">
									Orders
								</span>
							</div>
						</Link>
					</div>

					<div className="card bg-base-100 border border-base-200 max-w-2xl mx-auto mb-12">
						<div className="card-body gap-0 p-0">
							<ul className="menu menu-lg w-full pb-0">
								<li className="border-b border-base-200">
									<Link
										href={
											"/user/account-details"
										}
										className="flex items-center gap-4 py-4 px-6 hover:bg-base-200">
										<IconUser className="w-6 h-6 text-primary" />
										<span className="text-base md:text-lg text-base-content">
											Account
											Details
										</span>
									</Link>
								</li>
								<li className="border-b border-base-200">
									<Link
										href={
											"/user/chat-us"
										}
										className="flex items-center gap-4 py-4 px-6 hover:bg-base-200">
										<IconPhone2 className="w-6 h-6 text-primary" />
										<span className="text-base md:text-lg text-base-content">
											Chat with us
										</span>
									</Link>
								</li>
								<li className="border-b border-base-200">
									<Link
										href={
											"/user/notifications"
										}
										className="flex items-center gap-4 py-4 px-6 hover:bg-base-200">
										<IconNotification className="w-6 h-6 text-primary" />
										<span className="text-base md:text-lg text-base-content">
											Notifications
										</span>
									</Link>
								</li>
								<li className="border-b border-base-200">
									<Link
										href={
											"/terms-services"
										}
										className="flex items-center gap-4 py-4 px-6 hover:bg-base-200">
										<IconNote className="w-6 h-6 text-primary" />
										<span className="text-base md:text-lg text-base-content">
											Terms &
											Services
										</span>
									</Link>
								</li>
								<li className="border-b border-base-200">
									<Link
										href={
											"/private-policy"
										}
										className="flex items-center gap-4 py-4 px-6 hover:bg-base-200">
										<IconLock className="w-6 h-6 text-primary" />
										<span className="text-base md:text-lg text-base-content">
											Privacy
											Policy
										</span>
									</Link>
								</li>
							</ul>
							<div className="p-2 ">
								<LogoutModal />
							</div>
						</div>
					</div>
				</div>
			</div>
			<BottomNav />
		</>
	);
}

export default UserPage;
