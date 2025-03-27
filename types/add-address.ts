import isValidObjectId from "@/utils/is-object-id";
import { z } from "zod";

const addAddressSchema = z.object({
	address: z.string().min(3, { message: "Address is too short" }),
	region: z.string().refine(
		(value) => {
			return isValidObjectId(value);
		},
		{ message: "Invalid region ID" }
	),
	landmark: z.string().optional(),
});

export default addAddressSchema;

export type AddAddressType = z.infer<typeof addAddressSchema>;
