import { z } from "zod";

export const signUpSchema = z
	.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters long")
			.max(20, "Username must be at most 20 characters long")
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"Username can only contain letters, numbers, and underscores",
			),
	})
	.required();

export type SignUpData = z.infer<typeof signUpSchema>;
