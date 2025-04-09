import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
// import IconBrush from "@/icons/brush";
import IconUser from "@/icons/user";
import Link from "next/link";
import PersonalInfo from "./_components/personal-info";
import { auth } from "@/auth";

async function AccountDetails() {
	const session = await auth();
	const user = session?.user;
	if (!user) return null;

	return (
		<>
			<div className="flex items-center mt-5 mb-10 gap-5 pr-10">
				<BackButton className="btn btn-sm btn-ghost">
					<IconArrowLeft className="w-6 h-6" />
				</BackButton>
				<h2 className="text-2xl font-bold text-center flex-1">
					Account Details
				</h2>
			</div>

			<div className="flex justify-center items-center gap-5 mb-10">
				<div className="relative w-[89px] aspect-square rounded-box flex justify-center items-center bg-accent/30">
					<IconUser className="w-10 h-10 text-[#292D32]" />

					{/* <button className="flex items-center justify-center bg-[#DDDCDC]/80 w-6 h-6 rounded-full absolute bottom-0 -right-2">
						<IconBrush className="w-4 h-4" />
					</button> */}
				</div>
			</div>

			<div className="px-5 mb-10">
				<h3 className="text-xl font-bold mb-5">Personal Info</h3>
				<PersonalInfo userId={user.id as string} />
				<h3 className="text-xl font-bold mb-5">My Locations</h3>
				<ul className="space-y-4">
					<li className="bg-accent/70 rounded-box">
						<Link
							className="flex items-center justify-between py-3 px-4 "
							href={`/user/account-details/edit-home`}>
							<span>Home</span>

							<div className="flex items-center gap-3">
								<span>123 home gone</span>
								<IconArrowLeft className="w-5 h-5 rotate-180" />
							</div>
						</Link>
					</li>
					<li className="bg-accent/70 rounded-box">
						<Link
							className="flex items-center justify-between py-3 px-4 "
							href={`/user/account-details/edit-work`}>
							<span>Work</span>

							<div className="flex items-center gap-3">
								<span></span>
								<IconArrowLeft className="w-5 h-5 rotate-180" />
							</div>
						</Link>
					</li>
					<li className="bg-accent/70 rounded-box">
						<Link
							className="flex items-center justify-between py-3 px-4 "
							href={`/user/account-details/edit-others`}>
							<span>Others</span>

							<div className="flex items-center gap-3">
								<span></span>
								<IconArrowLeft className="w-5 h-5 rotate-180" />
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default AccountDetails;
