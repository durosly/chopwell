"use client";
import { updateUserEmail } from "@/api";
import IconBrush from "@/icons/brush";
import { handleError } from "@/lib/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PropType = { email: string };

function EmailHandler({ email }: PropType) {
	const router = useRouter();
	const editModalRef = useRef<HTMLDialogElement>(null);
	const {
		register,
		handleSubmit,
		formState: { isDirty },
	} = useForm({
		defaultValues: {
			email,
		},
	});

	function showModal() {
		if (editModalRef.current) {
			editModalRef.current.showModal();
		}
	}
	function closeModal() {
		if (editModalRef.current) {
			editModalRef.current.close();
		}
	}

	const { mutate, isPending, isError, error } = useMutation({
		mutationFn: (data: { email: string }) => updateUserEmail(data),
		onSuccess: () => {
			toast.success("Success", { description: "Email updated successfully" });
			router.refresh();
			closeModal();
		},
	});

	function onSubmit(data: { email: string }) {
		if (!isDirty) return toast.error("No changes made");
		if (isPending) return toast.error("Updating email");

		mutate(data);
	}
	return (
		<>
			<button onClick={showModal} className="btn btn-square btn-sm mb-2">
				<IconBrush className="w-4 h-4" />
			</button>

			<dialog ref={editModalRef} className="modal">
				<div className="modal-box">
					<form method="dialog">
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Edit email</h3>
					<form onSubmit={handleSubmit(onSubmit)}>
						{isError && (
							<div className="alert alert-error alert-soft">
								<p>{handleError(error)}</p>
							</div>
						)}
						<fieldset className="fieldset">
							<div className="label">
								<span className="label-text-alt">
									Email
								</span>
							</div>
							<input
								type="email"
								placeholder="Email..."
								className="input w-full"
								{...register("email", {
									required: true,
								})}
							/>
						</fieldset>
						<button
							disabled={!isDirty || isPending}
							className="btn btn-primary btn-block mt-4">
							Save update
						</button>
						{isPending && (
							<div className="mt-2">
								<span className="loading loading-spinner"></span>
								<span>Updating...</span>
							</div>
						)}
					</form>
					<p className="py-4 text-xs">
						* Press ESC key or click outside to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default EmailHandler;
