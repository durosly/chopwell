import IconArrowLeft from "@/icons/arrow-left";
import IconGoogle from "@/icons/google-icon";
import Link from "next/link";

function LoginPage() {
	return (
		<div className="p-5">
			<header className="flex gap-4 items-center mb-10">
				<IconArrowLeft className="text-dark w-6 h-6" />
				<h1 className="text-center flex-1 sr-only">Login</h1>
			</header>

			<h2 className="text-center font-bold text-[32px]">Log in to your Chopwell account </h2>

			<form action="" className="space-y-6 mb-5">
				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Email / Phonenumber</span>
					</div>
					<input type="text" placeholder="Email / Phonenumber" className="input w-full bg-neutral text-xs rounded-2xl" />
				</label>

				<label className="form-control w-full">
					<div className="label">
						<span className="label-text">Password</span>
					</div>
					<div className="input bg-neutral text-xs flex items-center gap-2 rounded-2xl">
						<input type="text" className="grow" placeholder="Enter password" />
						<button type="button" className="text-primary underline">
							Show
						</button>
					</div>
				</label>

				<div className="form-control">
					<label className="cursor-pointer label justify-start gap-2">
						<input type="checkbox" defaultChecked className="checkbox checkbox-primary" />
						<span className="label-text">Remember me</span>
					</label>
				</div>

				<div>
					<button className="btn btn-primary btn-block rounded-full">Continue</button>
				</div>
			</form>

			<div className="text-xs text-primary flex justify-between">
				<Link href="/">Forgot password?</Link>
				<Link href="/signup">Create new account</Link>
			</div>

			<hr className="my-10" />
			<button className="btn btn-block rounded-full border-accent ">
				<IconGoogle className="w-5 h-5" />
				<p>Log in with google</p>
			</button>
		</div>
	);
}

export default LoginPage;
