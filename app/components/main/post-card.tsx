import { Pencil, Trash2 } from "lucide-react";
import type { Post } from "@/services/api/models";
import { timeAgo } from "@/utils";
import { useUserStore } from "@/stores";
import { useSearchParams } from "react-router";
import { Button } from "../ui";

type PostCardProps = {
	post: Post;
  setPostToAction: (post: Post) => void;
};

export function PostCard({ post, setPostToAction }: PostCardProps) {
  const [_, setSearchParams] = useSearchParams();
	const { currentUsername } = useUserStore();
	const { title, content, username, created_datetime } = post;
	const itsCurrentUserPost = currentUsername === username;

	function handleAction(action: "EDIT" | "DELETE") {
    setPostToAction(post);
    setSearchParams({ action });
	}

	return (
		<div className="border border-border rounded-lg flex flex-col gap-4">
			<div className="p-4 bg-primary text-white flex justify-between items-center rounded-t-lg gap-4">
				<h1 className="text-lg font-bold truncate">{title}</h1>

				{itsCurrentUserPost && (
					<div className="flex gap-4">
						<Button
							variant="default"
							className="hover:text-gray-200 cursor-pointer"
							onClick={() => handleAction("DELETE")}
						>
							<Trash2 />
						</Button>

						<Button
							variant="default"
							className="hover:text-gray-200 cursor-pointer"
							onClick={() => handleAction("EDIT")}
						>
							<Pencil />
						</Button>
					</div>
				)}
			</div>

			<div className="px-4 pb-4 flex flex-col gap-4">
				<div className="flex justify-between text-sm text-gray-500">
					<span className="font-bold">@{username}</span>
					<span>{timeAgo(created_datetime)}</span>
				</div>

				<p>{content}</p>
			</div>
		</div>
	);
}
