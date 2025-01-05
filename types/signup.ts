import { z } from "zod";
import { phone } from "phone";

// Custom validation function for Nigerian phone numbers
const phoneValidation = (value: string) => {
	const result = phone(value, { country: "NGA" }); // Set country to Nigeria (NGA)
	if (!result.isValid) {
		throw new Error("Invalid phone number for Nigeria");
	}
	return result.phoneNumber; // Return formatted Nigerian phone number
};

// Zod Schema
export const signupSchema = z
	.object({
		fullname: z
			.string()
			.min(1, { message: "Fullname is required" })
			.max(50, { message: "Fullname must be under 50 characters" })
			.refine((value) => value.trim().split(" ").length >= 2, {
				message: "Please enter both first and last names",
			}),
		contact: z
			.string({ required_error: "Type in contact information" })
			.min(1, { message: "Contact is required" })
			.refine(
				(value) => {
					const isEmail = z.string().email().safeParse(value).success;
					const isPhone = phone(value, { country: "NGA" }).isValid;
					return isEmail || isPhone;
				},
				{ message: "Must be a valid Nigerian phone number or email" }
			)
			.transform((value) => {
				const isPhone = phone(value, { country: "NGA" }).isValid;
				if (isPhone) {
					return { type: "phone", value: phoneValidation(value), raw: value }; // Include raw value
				} else {
					return { type: "email", value, raw: value }; // Include raw value
				}
			}),
		password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"], // Points the error to `confirmPassword`
	})
	.transform((data) => {
		const [firstName, ...lastNameParts] = data.fullname.trim().split(" ");
		return {
			...data,
			contact: data.contact.raw, // Keep raw contact value for validation purposes
			firstName,
			lastName: lastNameParts.join(" "), // Handles multi-word last names
			processedContact: { type: data.contact.type, value: data.contact.value }, // Store processed contact details
		};
	});

// TypeScript Type
export type SignupType = z.infer<typeof signupSchema>;
