import { Button, Input, Textarea } from "../../ui";
import { useAuth, useCreatePost } from "@/hooks";
import { postSchema, type PostInputsData } from "@/services/api/posts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function PostFormContent() {
	const { username } = useAuth();
	const { mutate, isPending } = useCreatePost();

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
		mutate(
			{ username, title: data.title, content: data.content },
			{
				onSuccess: () => {
					toast.success("Post created successfully!");
					reset();
				},
				onError: (error: { message?: string }) => {
					toast.error(error?.message || "Error while creating post. Try again later.");
				},
			},
		);
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
					loading={isPending}
				>
					Create
				</Button>
			</div>
		</form>
	);
}
