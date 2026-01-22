import { Button, Dialog } from "@/components/ui";
import { fetchApiWithMethod, revalidateClientTags } from "@/services/utils";
import { useTransition } from "react";
import { toast } from "sonner";
import { POSTS_TAG } from "@/services/api/fetch";
import type { Post } from "@/services/api/models";

type PostDeleteDialogProps = {
	postToAction: Post | null;
	clearPostToAction: () => void;
};

export function PostDeleteDialog({
	postToAction,
	clearPostToAction,
}: PostDeleteDialogProps) {
	const [isPending, startTransition] = useTransition();

	async function onSubmitDeletion() {
		startTransition(async () => {
			await fetchApiWithMethod(`/careers/${postToAction?.id}/`, {
				method: "DELETE",
			})
				.then(async () => {
					await revalidateClientTags([POSTS_TAG]);
					toast.success("Post deleted successfully!");
					clearPostToAction();
				})
				.catch((err) => {
					toast.error(
						err?.message || "Error while deleting post. Try again later.",
					);
				});
		});
	}

	return (
		<Dialog open onOpenChange={clearPostToAction} title="Delete Post">
			<div className="w-full flex flex-col gap-4">
				<h1>Are you sure you want to delete this post?</h1>

				<div className="w-full flex justify-end gap-4 mt-2">
					<Button variant="outline" onClick={clearPostToAction}>
						Cancel
					</Button>

					<Button
						variant="destructive"
						onClick={onSubmitDeletion}
						loading={isPending}
					>
						Delete
					</Button>
				</div>
			</div>
		</Dialog>
	);
}
