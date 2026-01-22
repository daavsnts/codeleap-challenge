import { Dialog } from "@/components/ui";
import type { Post } from "@/services/api/models";
import { PostForm } from "../post-form";

type PostEditDialogProps = {
	postToAction: Post | null;
	clearPostToAction: () => void;
};

export function PostEditDialog({
	postToAction,
	clearPostToAction,
}: PostEditDialogProps) {
	return (
		<Dialog open onOpenChange={clearPostToAction} title="Edit item">
			<PostForm
				postToAction={postToAction}
				clearPostToAction={clearPostToAction}
			/>
		</Dialog>
	);
}
