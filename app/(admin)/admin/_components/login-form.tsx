"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Inputs = {
	email: string;
	password: string;
};

function LoginForm() {
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
			console.log("login successful");
			toast.success("Authentication successful", { description: "you would be redirected shortly", id: toastRef.current });
			router.push("/dashboard");
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => mutate(data);

	return (
		<form className="card-body" onSubmit={handleSubmit(onSubmit)}>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Email</span>
				</label>
				<input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
			</div>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
			</div>
			<div className="form-control mt-6">
				<button disabled={isPending} className="btn btn-primary">
					Login
				</button>
			</div>
		</form>
	);
}

export default LoginForm;
