import { z } from "zod";
import isValidObjectId from "@/utils/is-object-id";

const foodFormSchema = z
	.object({
		name: z
			.string()
			.min(1, "name is required")
			.transform((val) => val.trim().toLowerCase()),
		_categoryId: z
			.string()
			.min(1, "Category is required")
			.refine(
				(val) => isValidObjectId(val),
				"Category ID must be a valid ObjectId"
			),
		_subCategoryId: z
			.string()
			.optional()
			.refine((val) => {
				if (!val) return true;
				return val.length > 0 && isValidObjectId(val);
			}, "Sub-category must be a valid ObjectId if provided"),
		price: z.coerce.number().min(0, "Price must be greater than 0"),
		short_desc: z
			.string()
			.min(1, "Short description is required")
			.transform((val) => val.trim()),
		timeChoice: z
			.string()
			.optional()
			.nullable()
			.transform((val) => (val === "" || val === null ? undefined : val))
			.pipe(z.enum(["breakfast", "lunch", "dinner"]).optional()),
		type: z
			.string()
			.optional()
			.nullable()
			.transform((val) => (val === "" || val === null ? undefined : val))
			.pipe(z.enum(["food", "drink", "combo"]).optional()),
	})
	.strict()
	.strip();

type FoodFormData = z.infer<typeof foodFormSchema>;

export { foodFormSchema, type FoodFormData };
