import { z } from "zod";

export const AdminUpdateFoodAvailabilitySchema = z.object({
	available: z.boolean({
		required_error: "Availability is required",
	}),
	preparation_time: z.coerce
		.number({
			required_error: "Preparation time is required",
		})
		.min(1, { message: "Preparation time must be greater than 0" }),
});

export type AdminUpdateFoodAvailabilityType = z.infer<typeof AdminUpdateFoodAvailabilitySchema>;
