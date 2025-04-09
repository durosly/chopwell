import UserModel from "@/models/user";
import FullnameHandler from "./fullname-handler";
import connectMongo from "@/lib/connectMongo";

async function PersonalInfo({ userId }: { userId: string }) {
	await connectMongo();
	const userInfo = await UserModel.findById(userId);
	if (!userInfo) throw new Error("Profile does not exist");

	return (
		<div className="space-y-4 mb-10">
			<FullnameHandler
				firstname={userInfo.firstname}
				lastname={userInfo.lastname}>
				<fieldset className="fieldset">
					<div className="label">
						<span className="label-text-alt">Full name</span>
					</div>
					<input
						type="text"
						placeholder="Full name..."
						className="input w-full"
						defaultValue={`${userInfo.lastname} ${userInfo.firstname}`}
						readOnly
					/>
				</fieldset>
			</FullnameHandler>
			<fieldset className="fieldset">
				<div className="label">
					<span className="label-text-alt">Phone number</span>
				</div>
				<input
					type="phone"
					placeholder="Phone number..."
					className="input w-full"
					defaultValue={"+234 12345678968"}
				/>
			</fieldset>
			<fieldset className="fieldset">
				<div className="label">
					<span className="label-text-alt">Email</span>
				</div>
				<input
					type="email"
					placeholder="Email..."
					className="input w-full"
					defaultValue={"test@gmail.com"}
				/>
			</fieldset>
		</div>
	);
}

export default PersonalInfo;
