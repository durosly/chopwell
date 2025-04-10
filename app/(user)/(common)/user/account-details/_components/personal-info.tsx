import UserModel from "@/models/user";
import FullnameHandler from "./fullname-handler";
import connectMongo from "@/lib/connectMongo";
import PhoneHandler from "./phone-handler";
import EmailHandler from "./email-handler";

async function PersonalInfo({ userId }: { userId: string }) {
	await connectMongo();
	const userInfo = await UserModel.findById(userId);
	if (!userInfo) throw new Error("Profile does not exist");

	return (
		<div className="space-y-4">
			<div className="flex gap-2 items-end">
				<div className="flex-1">
					<fieldset className="fieldset">
						<div className="label">
							<span className="label-text-alt">
								Full name
							</span>
						</div>
						<input
							type="text"
							placeholder="Full name..."
							className="input w-full"
							defaultValue={`${userInfo.lastname} ${userInfo.firstname}`}
							readOnly
						/>
					</fieldset>
				</div>
				<FullnameHandler
					firstname={userInfo.firstname}
					lastname={userInfo.lastname}
				/>
			</div>

			<div className="flex gap-2 items-end">
				<div className="flex-1">
					<fieldset className="fieldset">
						<div className="label">
							<span className="label-text-alt">
								Phone number
							</span>
						</div>
						<input
							type="phone"
							placeholder="Phone number..."
							className="input w-full"
							defaultValue={`${userInfo?.phone || "Enter phone"}`}
						/>
					</fieldset>
				</div>
				<PhoneHandler phone={userInfo?.phone || ""} />
			</div>

			<div className="flex gap-2 items-end">
				<div className="flex-1">
					<fieldset className="fieldset">
						<div className="label">
							<span className="label-text-alt">
								Email
							</span>
						</div>
						<input
							type="email"
							placeholder="Email..."
							className="input w-full"
							defaultValue={`${userInfo?.email || "Enter email"}`}
							readOnly
						/>
					</fieldset>
				</div>
				<EmailHandler email={userInfo?.email || ""} />
			</div>
		</div>
	);
}

export default PersonalInfo;
