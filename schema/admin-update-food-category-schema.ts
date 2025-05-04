import { z } from "zod";

export const adminUpdateFoodCategorySchema = z.object({
	_categoryId: z.string({
		required_error: "Category is required",
	}),
	_subCategoryId: z.string({
		required_error: "Subcategory is required",
	}),
	type: z.enum(["food", "drink", "combo"], {
		required_error: "Type is required",
	}),
	timeChoice: z.enum(["breakfast", "lunch", "dinner"], {
		required_error: "Time choice is required",
	}),
});

export type AdminUpdateFoodCategoryType = z.infer<typeof adminUpdateFoodCategorySchema>;
