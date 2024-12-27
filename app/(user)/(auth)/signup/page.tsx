import IconArrowLeft from "@/icons/arrow-left";
import IconGoogle from "@/icons/google-icon";

function SignupPage() {
	return (
		<div className="p-5">
			<header className="flex gap-4 items-center mb-10">
				<IconArrowLeft className="text-dark w-6 h-6" />
				<h1 className="text-center flex-1">Register</h1>
			</header>

			<h2 className="text-center font-bold text-[32px]">Let&apos;s get you stated with Chopwell </h2>

			<form action="" className="space-y-6">
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Fullname</span>
					</div>
					<input type="text" placeholder="Fullname" className="input w-full bg-neutral text-xs rounded-2xl" />
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Email / Phonenumber</span>
					</div>
					<input type="text" placeholder="Email / Phonenumber" className="input w-full bg-neutral text-xs rounded-2xl" />
				</label>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Create Password</span>
					</div>
					<div className="input bg-neutral text-xs flex items-center gap-2 rounded-2xl">
						<input type="text" className="grow" placeholder="Create password" />
						<button type="button" className="text-primary underline">
							Show
						</button>
					</div>
				</label>
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Confirm Password</span>
					</div>
					<div className="input bg-neutral text-xs flex items-center gap-2 rounded-2xl">
						<input type="text" className="grow" placeholder="Confirm your password" />
						<button type="button" className="text-primary underline">
							Show
						</button>
					</div>
				</label>

				<div>
					<button className="btn btn-primary btn-block rounded-full">Continue</button>
				</div>
			</form>

			<hr className="my-10" />
			<button className="btn btn-block rounded-full border-accent ">
				<IconGoogle className="w-5 h-5" />
				<p>Signup with google</p>
			</button>
		</div>
	);
}

export default SignupPage;
