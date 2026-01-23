import { Pencil, Trash2 } from "lucide-react";
import type { Post } from "@/services/api/posts";
import { timeAgo } from "@/utils";
import { useSearchParams } from "react-router";
import { Button } from "../../ui";
import { useAuth } from "@/hooks";

type PostCardProps = {
	post: Post;
	setPostToAction: (post: Post) => void;
};

export function PostCard({ post, setPostToAction }: PostCardProps) {
	const [_, setSearchParams] = useSearchParams();
	const { user } = useAuth();

	const { title, content, username: postUsername, created_datetime } = post;
	const itsCurrentUserPost = user.username === postUsername;

	function handleAction(action: "EDIT" | "DELETE") {
		setPostToAction(post);
		setSearchParams({ action });
	}

	return (
		<div className="border border-border rounded-lg flex flex-col gap-4">
			<div className="p-4 bg-primary text-white flex justify-between items-center rounded-t-lg gap-4">
				<h1 className="text-lg font-bold truncate">{title}</h1>

				{itsCurrentUserPost ? (
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
				) : null}
			</div>

			<div className="px-4 pb-4 flex flex-col gap-4">
				<div className="flex justify-between text-sm text-gray-500">
					<span className="font-bold">@{postUsername}</span>
					<span>{timeAgo(created_datetime)}</span>
				</div>

				<p>{content}</p>
			</div>
		</div>
	);
}

export function PostCardSkeleton() {
	return (
		<div className="border border-border rounded-lg flex flex-col gap-4 animate-pulse">
			{/* Header */}
			<div className="p-4 bg-gray-300 flex justify-between items-center rounded-t-lg">
				{/* Title */}
				<div className="h-5 w-40 bg-gray-400 rounded" />

				{/* Actions */}
				<div className="flex gap-4">
					<div className="h-8 w-8 bg-gray-400 rounded" />
					<div className="h-8 w-8 bg-gray-400 rounded" />
				</div>
			</div>

			{/* Content */}
			<div className="px-4 pb-4 flex flex-col gap-4">
				{/* Meta */}
				<div className="flex justify-between">
					<div className="h-4 w-24 bg-gray-300 rounded" />
					<div className="h-4 w-20 bg-gray-300 rounded" />
				</div>

				{/* Text */}
				<div className="flex flex-col gap-2">
					<div className="h-4 w-full bg-gray-300 rounded" />
					<div className="h-4 w-full bg-gray-300 rounded" />
					<div className="h-4 w-3/4 bg-gray-300 rounded" />
				</div>
			</div>
		</div>
	);
}
