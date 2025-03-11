import IconArrowLeft from "@/icons/arrow-left";
import IconGoogle from "@/icons/google-icon";
import Link from "next/link";
import GoogleButton from "../_components/google-button";
import UserLoginForm from "./_component/login-form";
import BackButton from "@/app/_components/back-button";

function LoginPage() {
	return (
		<div className="p-5">
			<header className="flex gap-4 items-center mb-10">
				<BackButton className="sm:hidden">
					<IconArrowLeft className="text-dark w-6 h-6" />
				</BackButton>
				<h1 className="text-center flex-1 sr-only">Login</h1>
			</header>
			<div className="max-w-[400px] mx-auto mb-10">
				<h2 className="text-center font-bold text-3xl mb-4">
					Log in to your Chopwell account{" "}
				</h2>

				<UserLoginForm />

				<div className="text-xs text-primary flex justify-between">
					<Link href="/">Forgot password?</Link>
					<Link href="/signup">Create new account</Link>
				</div>

				<hr className="my-10" />
				<GoogleButton>
					<IconGoogle className="w-5 h-5" />
					<p>Log in with google</p>
				</GoogleButton>
			</div>
		</div>
	);
}

export default LoginPage;
