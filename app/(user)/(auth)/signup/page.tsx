import IconArrowLeft from "@/icons/arrow-left";
import IconGoogle from "@/icons/google-icon";
import GoogleButton from "../_components/google-button";
import BackButton from "@/app/_components/back-button";
import SignupForm from "./_components/signup-form";

function SignupPage() {
	return (
		<div className="p-5">
			<header className="flex gap-4 items-center mb-10">
				<BackButton>
					<IconArrowLeft className="text-dark w-6 h-6" />
				</BackButton>
				<h1 className="text-center flex-1">Register</h1>
			</header>

			<h2 className="text-center font-bold text-[32px]">Let&apos;s get you stated with Chopwell </h2>

			<SignupForm />

			<hr className="my-10" />
			<GoogleButton>
				<IconGoogle className="w-5 h-5" />
				<p>Signup with google</p>
			</GoogleButton>
		</div>
	);
}

export default SignupPage;
