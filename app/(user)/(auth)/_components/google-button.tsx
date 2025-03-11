"use client";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import { toast } from "sonner";

function GoogleButton({ children }: { children: React.ReactNode }) {
	const toastRef = useRef<string | number | undefined>(undefined);
	const { isPending, mutate } = useMutation({
		mutationFn: async () => {
			toastRef.current = toast.loading("Authenticating user...", {
				duration: Infinity,
				id: toastRef.current,
			});
			await signIn("google", { redirectTo: "/" });
		},
		onError: (error) => {
			toast.error("An error occured", {
				description: error.message,
				id: toastRef.current,
			});
		},
		onSuccess: () => {
			toast.info("Authenticating with google", {
				description: "you would be redirected shortly",
				id: toastRef.current,
			});
		},
		onSettled: () => {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
		},
	});

	return (
		<button
			disabled={isPending}
			onClick={() => mutate()}
			className="btn btn-block border-accent">
			{children}
		</button>
	);
}

export default GoogleButton;
