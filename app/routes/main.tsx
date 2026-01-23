import { useSearchParams } from "react-router";
import type { Route } from "./+types/main";
import {
	PostForm,
	PostCard,
	PostDeleteDialog,
	PostEditDialog,
	PostCardSkeleton,
} from "@/components/main";
import { getPosts, POSTS_TAG } from "@/services/api/posts";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "@/services/api/posts";
import { useId, useState } from "react";
import { Button } from "@/components/ui";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

export default function Home() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [postToAction, setPostToAction] = useState<Post | null>(null);
	const { handleLogout } = useAuth();

	const action = searchParams.get("action") as string;

	const { data: posts, isLoading } = useQuery({
		queryFn: () => getPosts(),
		queryKey: [POSTS_TAG],
	});

	function clearPostToAction() {
		setPostToAction(null);
		setSearchParams({}, { replace: true });
	}

	const baseSkeletonId = useId();
	const isEditAction = action === "EDIT";
	const isDeleteAction = action === "DELETE";

	return (
		<main className="flex min-h-screen w-full justify-center">
			<div className="w-full flex flex-col bg-white max-w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
				<div className="flex justify-between gap-4 p-4 bg-primary text-white fixed w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
					<h1 className="text-xl font-bold">CodeLeap Network</h1>
					<Button onClick={handleLogout}>
						<LogOut />
					</Button>
				</div>

				<div className="flex flex-col gap-4 p-4 mt-15">
					<div className="border border-border rounded-lg p-4 flex flex-col gap-4">
						<h1 className="text-lg font-semibold">What's on your mind?</h1>
						<PostForm />
					</div>

					{isLoading
						? [0, 1, 2].map((i) => (
								<PostCardSkeleton key={`${baseSkeletonId}-${i}`} />
							))
						: posts?.results.map((post) => (
								<PostCard
									key={post.id}
									post={post}
									setPostToAction={setPostToAction}
								/>
							))}
				</div>
			</div>

			{isEditAction ? (
				<PostEditDialog
					postToAction={postToAction}
					clearPostToAction={clearPostToAction}
				/>
			) : null}
			{isDeleteAction ? (
				<PostDeleteDialog
					postToAction={postToAction}
					clearPostToAction={clearPostToAction}
				/>
			) : null}
		</main>
	);
}
