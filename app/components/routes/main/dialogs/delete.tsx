import { Button, Dialog } from "../../../ui";
import { useDeletePost } from "@/hooks";
import type { Post } from "@/services/api/posts";
import { toast } from "sonner";

type PostDeleteDialogProps = {
	postToAction: Post | null;
	clearPostToAction: () => void;
};

export function PostDeleteDialog({
	postToAction,
	clearPostToAction,
}: PostDeleteDialogProps) {
	const { mutate, isPending } = useDeletePost();

	function onSubmitDeletion() {
		if (!postToAction?.id) return;

		mutate(postToAction.id, {
			onSuccess: () => {
				toast.success("Post deleted successfully!");
				clearPostToAction();
			},
			onError: (error: { message?: string }) => {
				toast.error(error?.message || "Error while deleting post. Try again later.");
			},
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
