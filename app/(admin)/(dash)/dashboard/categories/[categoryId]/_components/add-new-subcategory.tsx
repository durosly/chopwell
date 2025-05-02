"use client";

import { handleError } from "@/lib/handleError";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { LuX } from "react-icons/lu";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Define a schema for file validation
const fileSchema = z.object({
	name: z.string(),
	size: z.number().max(MAX_FILE_SIZE, "File size exceeds 5MB"),
	type: z.string().regex(/^image\/(jpeg|png|gif|webp)$/, "Invalid file type"),
});

type CustomCSSProperties = React.CSSProperties & {
	[key: `--${string}`]: string | number;
};

function AddNewSubcategory({ categoryId }: { categoryId: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();
	const [progress, setProgress] = useState(0);
	const [categoryName, setCategoryName] = useState("");
	const [categoryCover, setCategoryCover] = useState<File | null>(null);
	const [isPending, setIsPending] = useState(false);
	const toastRef = useRef<string | number | undefined>(undefined);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!categoryName)
			return toast.error("Error", { description: "Please, enter category name" });
		if (!categoryCover)
			return toast.error("Error", {
				description: "Please, select a category cover image",
			});

		// Validate file properties
		const validationResult = fileSchema.safeParse({
			name: categoryCover?.name,
			size: categoryCover?.size,
			type: categoryCover?.type,
		});

		if (!validationResult.success) {
			return toast.error("File upload error", {
				description: validationResult.error.errors[0].message,
			});
		}

		if (isPending)
			return toast.error("Error", { description: "An upload is in progress..." });

		setIsPending(true);
		setProgress(0);

		try {
			// get pre-signed link to upload file to s3
			const { data: presignedUrl } = await axios.get("/api/admin/presigned-url", {
				params: { imgName: categoryCover?.name },
			});

			toastRef.current = toast.loading("Creating new subcategory...", {
				duration: Infinity,
				id: toastRef.current,
			});

			const data = new FormData();
			data.append("categoryCover", categoryCover);
			// data.append("categoryName", categoryName);

			const uploadResponse = await axios.put(presignedUrl.url, categoryCover, {
				onUploadProgress: (e) => {
					if (e.lengthComputable && e.total) {
						setProgress(Math.round((e.loaded / e.total) * 100));
					}
				},
			});

			if (uploadResponse.status >= 200 && uploadResponse.status <= 299) {
				const response = await axios.post(
					`/api/admin/categories/${categoryId}/subcategories`,
					{
						name: categoryName,
						image: presignedUrl.name,
					}
				);

				queryClient.invalidateQueries({
					queryKey: ["subcategories", categoryId],
				});
				setCategoryCover(null);
				setCategoryName("");
				return toast.success("Success", {
					description: `New subcategory ${response.data.subcategoryId} has been added`,
					id: toastRef.current,
				});
			} else {
				throw new Error(uploadResponse.data.message);
			}
		} catch (error: unknown) {
			console.log(error);
			const message = handleError(error);
			toast.error("An error occured", {
				description: message,
				id: toastRef.current,
			});
		} finally {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
			setIsPending(false);
		}
	}

	const progressStyle: CustomCSSProperties = {
		"--value": progress,
		"--size": "5rem",
	};
	return (
		<>
			<div className="mt-6">
				<button className="btn btn-primary" onClick={() => setIsOpen(true)}>
					Add New Subcategory
				</button>
			</div>
			{isOpen && (
				<div className="modal modal-bottom sm:modal-middle modal-open">
					<div className="modal-box">
						<button
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							onClick={() => setIsOpen(false)}>
							<LuX className="size-4" />
						</button>
						<form onSubmit={handleSubmit}>
							<h2 className="card-title mb-5">
								Add new subcategory
							</h2>
							<div className="form-control mb-3">
								<input
									type="text"
									value={categoryName}
									onChange={(e) =>
										setCategoryName(
											e.target
												.value
										)
									}
									placeholder="Subcategory name..."
									className="input w-full"
								/>
							</div>
							<div className="form-control mb-3">
								<input
									type="file"
									accept="image/*"
									className="file-input w-full"
									onChange={(e) => {
										const file =
											e.target
												.files?.[0];
										if (file) {
											setCategoryCover(
												file
											);
										}
									}}
								/>
							</div>

							{isPending && (
								<div className="mb-3">
									<div
										className="radial-progress"
										style={
											progressStyle
										}
										role="progressbar">
										{progress}%
									</div>
									<p className="text-xs text-slate-500 animate-pulse">
										Uploading image...
									</p>
								</div>
							)}

							<button
								disabled={isPending}
								className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
}

export default AddNewSubcategory;
