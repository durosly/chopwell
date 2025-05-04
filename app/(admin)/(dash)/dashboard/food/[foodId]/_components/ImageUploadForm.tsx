"use client";

import { updateFoodImage } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { FoodData } from "@/models/food";
import { ToastRef } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

interface ImageUploadFormProps {
	food: FoodData & { _id: string };
}

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

export default function ImageUploadForm({ food }: ImageUploadFormProps) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [foodImage, setFoodImage] = useState<File | null>(null);
	const [isPending, setIsPending] = useState(false);
	const [progress, setProgress] = useState(0);
	const toastRef = useRef<ToastRef>(undefined);
	const queryClient = useQueryClient();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFoodImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!foodImage)
			return toast.error("Error", {
				description: "Please, select a food image",
			});

		// Validate file properties
		const validationResult = fileSchema.safeParse({
			name: foodImage?.name,
			size: foodImage?.size,
			type: foodImage?.type,
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
			toastRef.current = toast.loading("Generating presigned url...", {
				duration: Infinity,
				id: toastRef.current,
			});
			// get pre-signed link to upload file to s3
			const { data: presignedUrl } = await axios.get("/api/admin/presigned-url", {
				params: { imgName: foodImage?.name },
			});

			toastRef.current = toast.loading("Uploading image...", {
				id: toastRef.current,
			});

			const uploadResponse = await axios.put(presignedUrl.url, foodImage, {
				onUploadProgress: (e) => {
					if (e.lengthComputable && e.total) {
						setProgress(Math.round((e.loaded / e.total) * 100));
					}
				},
			});

			if (uploadResponse.status >= 200 && uploadResponse.status <= 299) {
				await updateFoodImage(food._id, {
					image: presignedUrl.name,
				});

				queryClient.invalidateQueries({ queryKey: ["food", food._id] });
				setFoodImage(null);

				return toast.success("Success", {
					description: `New food image has been added`,
					id: toastRef.current,
				});
			} else {
				throw new Error(uploadResponse.data.message);
			}
		} catch (error: unknown) {
			console.log(error);
			const message = handleError(error);
			toast.error(message, {
				id: toastRef.current,
			});
		} finally {
			setTimeout(() => toast.dismiss(toastRef.current), 5000);
			setIsPending(false);
		}
	};

	const progressStyle: CustomCSSProperties = {
		"--value": progress,
		"--size": "5rem",
	};

	return (
		<div className="card bg-base-100">
			<div className="card-body">
				<h2 className="card-title">Image Upload</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text">
								Food Image
							</span>
						</label>
						<input
							type="file"
							name="image"
							accept="image/*"
							className="file-input file-input-bordered w-full"
							onChange={handleFileChange}
						/>
					</div>

					{previewUrl && (
						<div className="flex flex-col items-center justify-center">
							<div className="relative w-64 h-64">
								<Image
									src={previewUrl}
									alt="Preview"
									className="w-full h-full object-cover rounded-lg"
									fill
									sizes="256px"
								/>
							</div>
							<p className="text-xs">
								* Preview of selected image
							</p>
						</div>
					)}

					{food.image && !previewUrl && (
						<div className="flex justify-center">
							<div className="relative w-64 h-64">
								<Image
									src={food.image}
									alt="Current food"
									className="w-full h-full object-cover rounded-lg"
									fill
									placeholder="blur"
									blurDataURL={
										food.coverImagePlaceholder
									}
									sizes="256px"
								/>
							</div>
						</div>
					)}

					{isPending && (
						<div className="mb-3">
							<div
								className="radial-progress"
								style={progressStyle}
								role="progressbar">
								{progress}%
							</div>
							<p className="text-xs text-slate-500 animate-pulse">
								Uploading image...
							</p>
						</div>
					)}

					<div className="card-actions justify-end">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={isPending || !foodImage}>
							{isPending
								? "Uploading..."
								: "Upload Image"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
