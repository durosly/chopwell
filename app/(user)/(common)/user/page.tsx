import IconBrush from "@/icons/brush";
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

function UserPage() {
	return (
		<>
			<div className="px-5 md:px-10 min-h-[100dvh]">
				<div className="my-5">
					<h2 className="text-2xl font-bold text-center">
						My Account
					</h2>
				</div>
				<div className="flex items-center gap-5 mb-10">
					<div className="relative w-[89px] aspect-square rounded-box flex justify-center items-center bg-accent/30">
						<IconUser className="w-10 h-10 text-[#292D32]" />

						<button className="flex items-center justify-center bg-[#DDDCDC]/80 w-6 h-6 rounded-full absolute bottom-0 -right-2">
							<IconBrush className="w-4 h-4" />
						</button>
					</div>
					<p className="text-dark font-bold">Clement John</p>
				</div>

				<div className="flex gap-10 justify-center items-start mb-10">
					<Link
						className="w-20 h-20 flex flex-col justify-center items-center rounded-box text-center bg-accent"
						href="/favorites">
						<IconHeart className="w-8 h-8" />
						<span className="text-xs capitalize">
							Favourites
						</span>
					</Link>
					<Link
						className="w-20 h-20 flex flex-col justify-center items-center rounded-box text-center bg-accent"
						href="/wallet">
						<IconWallet className="w-8 h-8" />
						<span className="text-xs capitalize">Wallet</span>
					</Link>
					<Link
						className="w-20 h-20 flex flex-col justify-center items-center rounded-box text-center bg-accent stroke-dark stroke-1"
						href="/orders">
						<IconTruck className="w-8 h-8" />
						<span className="text-xs capitalize">Orders</span>
					</Link>
				</div>

				<ul>
					<li className=" border-b border-accent">
						<Link
							href={"/user/account-details"}
							className="flex items-center gap-3 py-3 hover:bg-accent/10">
							<IconUser className="w-6 h-6" />{" "}
							<span>Account Details</span>
						</Link>
					</li>
					<li className=" border-b border-accent">
						<Link
							href={"/user/chat-us"}
							className="flex items-center gap-3 py-3 hover:bg-accent/10 fill-current ">
							<IconPhone2 className="w-6 h-6" />{" "}
							<span>Chat with us</span>
						</Link>
					</li>
					<li className=" border-b border-accent">
						<Link
							href={"/user/notifications"}
							className="flex items-center gap-3 py-3 hover:bg-accent/10">
							<IconNotification className="w-6 h-6" />{" "}
							<span>Notifications</span>
						</Link>
					</li>
					<li className=" border-b border-accent">
						<Link
							href={"/user/terms-services"}
							className="flex items-center gap-3 py-3 hover:bg-accent/10">
							<IconNote className="w-6 h-6" />{" "}
							<span>Terms &amp; Services</span>
						</Link>
					</li>
					<li className=" border-b border-accent">
						<Link
							href={"/user/private-policy"}
							className="flex items-center gap-3 py-3 hover:bg-accent/10">
							<IconLock className="w-6 h-6" />{" "}
							<span>Privacy Policy</span>
						</Link>
					</li>
				</ul>
				<LogoutModal />
			</div>
			<BottomNav />
		</>
	);
}

export default UserPage;
