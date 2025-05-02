import { z } from "zod";

const foodFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	_categoryId: z.string().min(1, "Category is required"),
	_subCategoryId: z.string().min(1, "Sub-category is required"),
	price: z.number().min(0, "Price must be greater than 0"),
	short_desc: z.string().min(1, "Short description is required"),
	timeChoice: z.enum(["breakfast", "lunch", "dinner"]),
	type: z.enum(["food", "drink", "combo"]),
});

type FoodFormData = z.infer<typeof foodFormSchema>;

export { foodFormSchema, type FoodFormData };
