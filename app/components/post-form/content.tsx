"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { POSTS_TAG } from "@/services/api/fetch";
import { fetchApiWithMethod, revalidateClientTags } from "@/services/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const postSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	content: z.string().min(10, "Content must be at least 10 characters"),
});

type PostInputsData = z.infer<typeof postSchema>;

export function PostFormContent() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	const form = watch();

	function isFieldEmpty(name: Exclude<keyof PostInputsData, "id">) {
		const value = form[name];
		return !value || value.trim() === "";
	}

	const someFieldIsEmpty = isFieldEmpty("title") || isFieldEmpty("content");

	async function onSubmit(data: PostInputsData) {
		setIsSubmitting(true);

		await fetchApiWithMethod("/careers/", {
			body: data,
			method: "POST",
		})
			.then(async () => {
				await revalidateClientTags([POSTS_TAG]);
				toast.success(`Post created successfully!`);
				reset();
			})
			.catch((err) => {
				toast.error(
					err?.message || `Error while creating post. Try again later.`,
				);
			});

		setIsSubmitting(false);
	}

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Title"
				placeholder="Hello World"
				{...register("title")}
				error={errors.title?.message}
			/>

			<Textarea
				label="Content"
				placeholder="Content here"
				className="min-h-35"
				{...register("content")}
				error={errors.content?.message}
			/>

			<div className="w-full flex justify-end gap-4">
				<Button
					type="submit"
					variant="primary"
					disabled={someFieldIsEmpty}
					loading={isSubmitting}
				>
					Create
				</Button>
			</div>
		</form>
	);
}
