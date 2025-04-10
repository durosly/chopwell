import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";
// import IconBrush from "@/icons/brush";
import IconUser from "@/icons/user";
import Link from "next/link";
import PersonalInfo from "./_components/personal-info";
import { auth } from "@/auth";
import { Suspense } from "react";
import AddNewUserAddress from "./_components/add-address-modal";
import AddressDisplay from "./_components/address-display";

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
				<div className="relative w-[89px] aspect-square rounded-box flex justify-center items-center bg-base-100">
					<IconUser className="w-10 h-10 text-[#292D32]" />

					{/* <button className="flex items-center justify-center bg-[#DDDCDC]/80 w-6 h-6 rounded-full absolute bottom-0 -right-2">
						<IconBrush className="w-4 h-4" />
					</button> */}
				</div>
			</div>

			<div className="px-5 mb-10 max-w-md mx-auto">
				<div className="card bg-base-100 mb-5">
					<div className="card-body">
						<h3 className="text-xl font-bold mb-5">
							Personal Info
						</h3>
						<Suspense
							fallback={
								<div>
									<span className="loading loading-spinner"></span>{" "}
									<span>Loading...</span>
								</div>
							}>
							<PersonalInfo userId={user.id as string} />
						</Suspense>
					</div>
				</div>
				<div className="card bg-base-100">
					<div className="card-body">
						<h3 className="text-xl font-bold mb-5">
							My Locations
						</h3>
						<ul className="space-y-4 mb-2">
							<AddressDisplay />
						</ul>
						<AddNewUserAddress />
					</div>
				</div>
			</div>
		</>
	);
}

export default AccountDetails;
