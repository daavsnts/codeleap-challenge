import { Button, Input, Textarea } from "@/components/ui";
import { useAuth, useCreatePost, useUpdatePost } from "@/hooks";
import type { Post } from "@/services/api/posts";
import { postSchema, type PostInputsData } from "@/services/api/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PostFormProps = {
	postToAction?: Post | null;
	clearPostToAction?: () => void;
};

export function PostForm({ postToAction, clearPostToAction }: PostFormProps) {
	const { user } = useAuth();
	const { mutate: createPost, isPending: isCreating } = useCreatePost();
	const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();

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
	const isPending = isCreating || isUpdating;

	function isFieldEmpty(name: Exclude<keyof PostInputsData, "id">) {
		const value = form[name];
		return !value || value.trim() === "";
	}

	const someFieldIsEmpty = isFieldEmpty("title") || isFieldEmpty("content");

	async function onSubmit({ id, title, content }: PostInputsData) {
		if (isEditingPost && id) {
			updatePost(
				{ id, title, content },
				{
					onSuccess: () => {
						toast.success("Post edited successfully!");
						reset();
						clearPostToAction?.();
					},
					onError: (error: { message?: string }) => {
						toast.error(
							error?.message || "Error while editing post. Try again later.",
						);
					},
				},
			);
			return;
		}

		createPost(
			{ username: user.username, title, content },
			{
				onSuccess: () => {
					toast.success("Post created successfully!");
					reset();
				},
				onError: (error: { message?: string }) => {
					toast.error(
						error?.message || "Error while creating post. Try again later.",
					);
				},
			},
		);
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
