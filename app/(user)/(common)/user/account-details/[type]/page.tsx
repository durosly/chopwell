import BackButton from "@/app/_components/back-button";
import IconArrowLeft from "@/icons/arrow-left";

async function AccountFormType({ params }: { params: Promise<{ type: string }> }) {
	const { type } = await params;
	return (
		<>
			<div className="flex items-center mt-5 mb-10 gap-5 pr-10">
				<BackButton className="btn btn-sm btn-ghost">
					<IconArrowLeft className="w-6 h-6" />
				</BackButton>
				<h2 className="text-2xl font-bold text-center flex-1">
					Edit {type}
				</h2>
			</div>

			<div className="px-5 mb-10">
				<form action="" className="space-y-4 mb-10">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text-alt">
								Address line 1
							</span>
						</div>
						<input
							type="text"
							placeholder="Address line 1..."
							className="input bg-neutral/60 w-full"
							defaultValue={"123 john doe street"}
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text-alt">
								Address line 2
							</span>
						</div>
						<input
							type="text"
							placeholder="Address line 2..."
							className="input bg-neutral/60 w-full"
							defaultValue={"345 john doe street"}
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text-alt">
								State/Region
							</span>
						</div>
						<input
							type="text"
							placeholder="State/Region..."
							className="input bg-neutral/60 w-full"
							defaultValue={"Delta"}
						/>
					</label>
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text-alt">
								City/Town
							</span>
						</div>
						<input
							type="text"
							placeholder="City/Town..."
							className="input bg-neutral/60 w-full"
							defaultValue={"Warri"}
						/>
					</label>
				</form>
			</div>

			<div className="px-5">
				<button className="btn btn-primary btn-block rounded-full">
					Save Update
				</button>
			</div>
		</>
	);
}

export default AccountFormType;
