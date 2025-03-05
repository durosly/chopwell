"use client";

import { useRef } from "react";
import { LuPencil } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartGroupTitle } from "@/api";
import { handleError } from "@/lib/handleError";
import { toast } from "sonner";

type PropType = {
	groupId: string;
};

function GroupTitle({ groupId }: PropType) {
	const ref = useRef<HTMLDialogElement>(null);

	function showModal() {
		if (ref.current) {
			ref.current.showModal();
		}
	}

	type FormData = {
		title: string;
	};

	const queryClient = useQueryClient();

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (data: FormData) => {
			// return updateGroupTitle(data);
			return updateCartGroupTitle({ id: groupId, title: data.title });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart-full-data"] });
			if (ref.current) {
				ref.current.close();
			}

			toast.success("Success", {
				description: "Group title updated successfully",
			});
		},
		onError: (error) => {
			const message = handleError(error);
			toast.error("Something went wrong", { description: message });
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<>
			<button onClick={showModal} className="btn btn-sm btn-ghost">
				<LuPencil />
			</button>

			<dialog ref={ref} className="modal">
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Update group title</h3>
					{isError && (
						<div className="bg-red-200 p-2 my-2 rounded">
							{handleError(error)}
						</div>
					)}

					<form onSubmit={handleSubmit(onSubmit)}>
						<fieldset className="fieldset">
							<legend className="fieldset-legend">
								Group title
							</legend>
							<input
								type="text"
								className="input w-full"
								{...register("title", {
									required: true,
								})}
							/>
							{errors.title && (
								<p className="text-red-500">
									This field is required
								</p>
							)}
							<p className="fieldset-label">
								This can be used to label your items
								when ordering for multiple persons
							</p>
						</fieldset>
						<button
							type="submit"
							disabled={isPending}
							className="btn btn-primary btn-block">
							Save
						</button>
					</form>

					<p className="py-4 text-xs text-gray-500">
						* Press ESC key or click the button below to close
					</p>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default GroupTitle;
