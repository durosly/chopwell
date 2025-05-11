"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";

type Inputs = {
	email: string;
	password: string;
};

function UserLoginForm() {
	const searchParams = useSearchParams();

	const nextUrl = searchParams.get("nextUrl");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const toastRef = useRef<string | number | undefined>(undefined);
	const { register, handleSubmit } = useForm<Inputs>();
	const { isPending, mutate } = useMutation({
		mutationFn: async (data: Inputs) => {
			toastRef.current = toast.loading("Authenticating user...", {
				duration: Infinity,
				id: toastRef.current,
			});
			const res = await signIn("credentials", { redirect: false, ...data });

			if (!res?.ok || res.error) {
				throw new Error(res?.code);
			}
		},
		onError: (error) => {
			toast.error("An error occured", {
				description: error.message,
				id: toastRef.current,
			});
		},
		onSuccess: () => {
			toast.success("Authentication successful", {
				description: "you would be redirected shortly",
				id: toastRef.current,
			});

			if (nextUrl) {
				router.push(nextUrl);
			} else {
				router.push("/");
			}
			router.refresh();
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);

	return (
		<form action="" className=" mb-5" onSubmit={handleSubmit(onSubmit)}>
			<fieldset className="fieldset">
				<label htmlFor="email" className="label">
					<span className="label-text">Email / Phonenumber</span>
				</label>
				<input
					type="text"
					placeholder="Email / Phonenumber"
					className="input w-full text-xs"
					id="email"
					{...register("email")}
				/>
			</fieldset>

			<fieldset className="fieldset">
				<label htmlFor="password" className="label">
					<span className="label-text">Password</span>
				</label>

				<div className="input text-xs flex items-center gap-2 w-full">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="Enter password"
						id="password"
						{...register("password")}
					/>
					<button
						onClick={() => setShowPassword((prev) => !prev)}
						type="button"
						className="text-primary underline cursor-pointer">
						{showPassword ? "Hide" : "Show"}
					</button>
				</div>
			</fieldset>

			{/* <div className="">
				<label className="cursor-pointer label justify-start gap-2">
					<input
						type="checkbox"
						defaultChecked
						className="checkbox checkbox-primary"
					/>
					<span className="label-text">Remember me</span>
				</label>
			</div> */}

			<div className="mt-5">
				<button disabled={isPending} className="btn btn-primary btn-block">
					Continue
				</button>
			</div>
		</form>
	);
}

export default UserLoginForm;
