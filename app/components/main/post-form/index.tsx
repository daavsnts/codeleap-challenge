import { Button, Input, Textarea } from "@/components/ui";
import { POSTS_TAG } from "@/services/api/fetch";
import type { Post } from "@/services/api/models";
import { fetchApiWithMethod, revalidateClientTags } from "@/services/utils";
import { useUserStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const postSchema = z.object({
	id: z.number().optional(),
	title: z.string().min(3, "Title must be at least 3 characters"),
	content: z.string().min(10, "Content must be at least 10 characters"),
});

type PostInputsData = z.infer<typeof postSchema>;

type PostFormProps = {
	postToAction?: Post | null;
	clearPostToAction?: () => void;
};

export function PostForm({ postToAction, clearPostToAction }: PostFormProps) {
	const [isPending, startTransition] = useTransition();
	const { currentUsername } = useUserStore();

	const {
		register,
		handleSubmit,
		watch,
		setValue,
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
	const isEditingPost = !!postToAction;

	function isFieldEmpty(name: Exclude<keyof PostInputsData, "id">) {
		const value = form[name];
		return !value || value.trim() === "";
	}

	const someFieldIsEmpty = isFieldEmpty("title") || isFieldEmpty("content");

	async function onSubmit(data: PostInputsData) {
		startTransition(async () => {
			const formattedData = {
				...(!isEditingPost && { username: currentUsername }),
				...data,
			};

			await fetchApiWithMethod(
				isEditingPost ? `/careers/${formattedData.id}/` : "/careers/",
				{
					body: formattedData,
					method: isEditingPost ? "PATCH" : "POST",
				},
			)
				.then(async () => {
					await revalidateClientTags([POSTS_TAG]);
					toast.success(
						`Post ${isEditingPost ? "edited" : "created"} successfully!`,
					);
					reset();
					if (isEditingPost) clearPostToAction?.();
				})
				.catch((err) => {
					toast.error(
						err?.message ||
							`Error while ${isEditingPost ? "editing" : "creating"} post. Try again later.`,
					);
				});
		});
	}

	useEffect(() => {
		if (!postToAction) return;

		setValue("title", postToAction.title);
		setValue("content", postToAction.content);
		setValue("id", postToAction.id);
	}, [postToAction, setValue]);

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
				{isEditingPost && (
					<Button variant="outline" onClick={clearPostToAction}>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					variant={isEditingPost ? "success" : "primary"}
					disabled={someFieldIsEmpty}
					loading={isPending}
				>
					{isEditingPost ? "Save" : "Create"}
				</Button>
			</div>
		</form>
	);
}
