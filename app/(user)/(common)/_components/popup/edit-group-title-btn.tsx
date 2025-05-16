"use client";

import CustomPortal from "@/app/_components/custom-portal";
import { useUpdateCartGroupTitle } from "@/hooks/useCart";
import { handleError } from "@/lib/handleError";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil, LuX } from "react-icons/lu";

type PropType = {
	groupId: string;
	title: string;
};

function EditGroupTitleBtn({ groupId, title }: PropType) {
	const [isOpen, setIsOpen] = useState(false);

	function showModal() {
		setIsOpen(true);
	}

	type FormData = {
		title: string;
	};

	const { isPending, mutate, isError, error } = useUpdateCartGroupTitle({
		groupId,
		onSuccess: () => {
			setIsOpen(false);
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isDirty },
	} = useForm<FormData>({
		defaultValues: {
			title,
		},
	});

	const onSubmit = (data: FormData) => {
		mutate(data);
	};

	return (
		<>
			<button onClick={showModal} className="btn btn-sm btn-square btn-ghost">
				<LuPencil className="size-4" />
			</button>

			{isOpen && (
				<CustomPortal>
					<dialog className="modal modal-open">
						<div className="modal-box">
							<button
								onClick={() => setIsOpen(false)}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
								<LuX className="size-4" />
							</button>

							<h3 className="font-bold text-lg">
								Update group title
							</h3>
							{isError && (
								<div className="alert alert-error alert-soft">
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
										{...register(
											"title",
											{
												required: true,
											}
										)}
									/>
									{errors.title && (
										<p className="text-red-500">
											This field
											is required
										</p>
									)}
									<p className="fieldset-label text-xs">
										This can be used to
										label your items
										when ordering for
										multiple persons
									</p>
								</fieldset>
								<button
									type="submit"
									disabled={
										isPending ||
										!isDirty
									}
									className="btn btn-primary btn-block">
									Save
								</button>
							</form>
						</div>
						<form method="dialog" className="modal-backdrop">
							<button onClick={() => setIsOpen(false)}>
								close
							</button>
						</form>
					</dialog>
				</CustomPortal>
			)}
		</>
	);
}

export default EditGroupTitleBtn;
