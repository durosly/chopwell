"use client";

import { signupSchema, type SignupType } from "@/types/signup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { handleError } from "@/lib/handleError";

function SignupForm() {
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();
	const toastRef = useRef<string | number | undefined>(undefined);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupType>({ resolver: zodResolver(signupSchema) });
	const { isPending, mutate } = useMutation({
		mutationFn: async (data: SignupType) => {
			toastRef.current = toast.loading("Authenticating user...", {
				duration: Infinity,
				id: toastRef.current,
			});
			const res = await axios.post("/api/auth/signup", data);

			console.log({ res });

			return res.data.message;
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("An error occured", {
				description: message,
				id: toastRef.current,
			});
		},
		onSuccess: () => {
			toast.success("Authentication successful", {
				description: "you would be redirected shortly",
				id: toastRef.current,
			});
			// TODO: redirect to callbackUrl if available
			router.push("/");
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});

	const onSubmit: SubmitHandler<SignupType> = (data: SignupType) => mutate(data);

	return (
		<form action="" className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
			<fieldset className="fieldset">
				<label htmlFor="fullname" className="label">
					<span className="label-text">Fullname</span>
				</label>
				<input
					type="text"
					{...register("fullname")}
					id="fullname"
					placeholder="Fullname"
					className={`input  w-full text-xs ${errors.fullname && "input-error"}`}
				/>
				{!!errors.fullname && (
					<div className="label">
						<span className="label-text-alt text-error">
							{errors.fullname?.message}
						</span>
					</div>
				)}
			</fieldset>
			<fieldset className="fieldset">
				<label htmlFor="contact" className="label">
					<span className="label-text">Email / Phonenumber</span>
				</label>
				<input
					type="text"
					{...register("contact")}
					id="contact"
					placeholder="Email / Phonenumber"
					className={`input w-full text-xs  ${errors.contact && "input-error"}`}
				/>
				{!!errors.contact && (
					<div className="label">
						<span className="label-text-alt text-error">
							{errors.contact?.message}
						</span>
					</div>
				)}
			</fieldset>

			<fieldset className="fieldset">
				<label htmlFor="password" className="label">
					<span className="label-text">Create Password</span>
				</label>
				<div
					className={`input text-xs flex items-center w-full gap-2 ${errors.password && "input-error"}`}>
					<input
						type={showPassword ? "text" : "password"}
						{...register("password")}
						id="password"
						placeholder="Create password"
					/>
					<button
						onClick={() => setShowPassword((prev) => !prev)}
						type="button"
						className="text-primary underline">
						{showPassword ? "Hide" : "Show"}
					</button>
				</div>

				{!!errors.password && (
					<div className="label">
						<span className="label-text-alt text-error">
							{errors.password?.message}
						</span>
					</div>
				)}
			</fieldset>
			<fieldset className="fieldset">
				<label htmlFor="confirmPassword" className="label">
					<span className="label-text">Confirm Password</span>
				</label>
				<div
					className={`input text-xs flex items-center gap-2 w-full ${errors.confirmPassword && "input-error"}`}>
					<input
						type={showPassword ? "text" : "password"}
						{...register("confirmPassword")}
						id="confirmPassword"
						placeholder="Confirm your password"
					/>
					<button
						onClick={() => setShowPassword((prev) => !prev)}
						type="button"
						className="text-primary underline">
						{showPassword ? "Hide" : "Show"}
					</button>
				</div>
				{!!errors.confirmPassword && (
					<div className="label">
						<span className="label-text-alt text-error">
							{errors.confirmPassword?.message}
						</span>
					</div>
				)}
			</fieldset>

			<div className="mt-5">
				<button disabled={isPending} className="btn btn-primary btn-block">
					Continue
				</button>
			</div>
		</form>
	);
}

export default SignupForm;
