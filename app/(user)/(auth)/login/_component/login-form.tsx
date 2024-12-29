"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
	email: string;
	password: string;
};

function UserLoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const toastRef = useRef<string | number | undefined>(undefined);
	const { register, handleSubmit } = useForm<Inputs>();
	const { isPending, mutate } = useMutation({
		mutationFn: async (data: Inputs) => {
			toastRef.current = toast.loading("Authenticating user...", { duration: Infinity, id: toastRef.current });
			const res = await signIn("credentials", { redirect: false, ...data });

			if (!res?.ok || res.error) {
				throw new Error(res?.code);
			}
		},
		onError: (error) => {
			toast.error("An error occured", { description: error.message, id: toastRef.current });
		},
		onSuccess: () => {
			toast.success("Authentication successful", { description: "you would be redirected shortly", id: toastRef.current });
			// TODO: redirect to callbackUrl if available
			router.push("/");
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);

	return (
		<form action="" className="space-y-6 mb-5" onSubmit={handleSubmit(onSubmit)}>
			<label className="form-control w-full">
				<div className="label">
					<span className="label-text">Email / Phonenumber</span>
				</div>
				<input type="text" placeholder="Email / Phonenumber" className="input w-full bg-neutral text-xs rounded-2xl" {...register("email")} />
			</label>

			<label className="form-control w-full">
				<div className="label">
					<span className="label-text">Password</span>
				</div>
				<div className="input bg-neutral text-xs flex items-center gap-2 rounded-2xl">
					<input type={showPassword ? "text" : "password"} className="grow" placeholder="Enter password" {...register("password")} />
					<button onClick={() => setShowPassword((prev) => !prev)} type="button" className="text-primary underline">
						{showPassword ? "Hide" : "Show"}
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
				<button disabled={isPending} className="btn btn-primary btn-block rounded-full">
					Continue
				</button>
			</div>
		</form>
	);
}

export default UserLoginForm;
