"use client";

import { handleError } from "@/lib/handleError";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";
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

function AddCategoryForm() {
	const queryClient = useQueryClient();
	const [progress, setProgress] = useState(0);
	const [categoryName, setCategoryName] = useState("");
	const [categoryCover, setCategoryCover] = useState<File | null>(null);
	const [isPending, setIsPending] = useState(false);
	const toastRef = useRef<string | number | undefined>(undefined);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!categoryName) return toast.error("Error", { description: "Please, enter category name" });
		if (!categoryCover) return toast.error("Error", { description: "Please, select a category cover image" });

		// Validate file properties
		const validationResult = fileSchema.safeParse({
			name: categoryCover?.name,
			size: categoryCover?.size,
			type: categoryCover?.type,
		});

		if (!validationResult.success) {
			return toast.error("File upload error", { description: validationResult.error.errors[0].message });
		}

		if (isPending) return toast.error("Error", { description: "An upload is in progress..." });

		setIsPending(true);
		setProgress(0);

		try {
			toastRef.current = toast.loading("Creating new category...", { duration: Infinity, id: toastRef.current });

			const data = new FormData();
			data.append("categoryCover", categoryCover);
			data.append("categoryName", categoryName);

			const respnose = await axios.post("/api/admin/categories/new", data, {
				onUploadProgress: (e) => {
					if (e.lengthComputable && e.total) {
						setProgress(Math.round((e.loaded / e.total) * 100));
					}
				},
			});

			if (respnose.status >= 200 && respnose.status <= 299) {
				queryClient.invalidateQueries({ queryKey: ["categories"] });
				return toast.success("Success", { description: `New category ${respnose.data.categoryId} has been added`, id: toastRef.current });
			} else {
				throw new Error(respnose.data.message);
			}
		} catch (error: unknown) {
			const message = handleError(error);
			toast.error("An error occured", { description: message, id: toastRef.current });
			setCategoryCover(null);
			setCategoryName("");
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
		<form className="card bg-base-100 mb-10" onSubmit={handleSubmit}>
			<div className="card-body">
				<h2 className="card-title mb-5">Add new category</h2>
				<div className="form-control mb-3">
					<input
						type="text"
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						placeholder="Category name..."
						className="input bg-neutral w-full"
					/>
				</div>
				<div className="form-control mb-3">
					<input
						type="file"
						accept="image/*"
						className="file-input bg-neutral w-full"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								setCategoryCover(file);
							}
						}}
					/>
				</div>

				{isPending && (
					<div className="mb-3">
						<div className="radial-progress" style={progressStyle} role="progressbar">
							{progress}%
						</div>
						<p className="text-xs text-slate-500 animate-pulse">Uploading image...</p>
					</div>
				)}

				<button disabled={isPending} className="btn btn-primary">
					Submit
				</button>
			</div>
		</form>
	);
}

export default AddCategoryForm;
