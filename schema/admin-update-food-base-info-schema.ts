import { z } from "zod";

export const adminUpdateFoodBaseInfoSchema = z.object({
	name: z.string({ required_error: "Name is required" }).min(1, "Name is required"),
	short_desc: z
		.string({ required_error: "Short description is required" })
		.min(1, "Short description is required"),
	full_desc: z
		.string({ required_error: "Full description is required" })
		.min(100, "Full description must be at least 100 characters"),
	price: z.coerce
		.number({ required_error: "Price is required" })
		.min(0, "Price must be a positive number"),
	number_of_item: z.coerce
		.number({ required_error: "Number of items is required" })
		.min(0, "Number of items must be a positive number"),
	unit: z
		.string({ required_error: "Unit of measurement is required" })
		.min(1, "Unit of measurement is required"),
});

export type AdminUpdateFoodBaseInfoSchema = z.infer<typeof adminUpdateFoodBaseInfoSchema>;
