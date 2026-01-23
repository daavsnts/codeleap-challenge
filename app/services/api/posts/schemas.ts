import { z } from "zod";

export const postSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	content: z.string().min(10, "Content must be at least 10 characters"),
});

export type PostInputsData = z.infer<typeof postSchema>;
