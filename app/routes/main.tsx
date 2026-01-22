import { useSearchParams } from "react-router";
import type { Route } from "./+types/main";
import { PostForm } from "@/components";
import { getPosts, POSTS_TAG } from "@/services/api/fetch";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "@/components/post-card";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

export default function Home() {
	const [searchParams] = useSearchParams();
	const postId = searchParams.get("postId") as string;

	const { data: posts, isLoading } = useQuery({
		queryFn: () => getPosts(),
		queryKey: [POSTS_TAG],
	});

	return (
		<main className="flex min-h-screen w-full justify-center">
			<div className="w-full flex flex-col bg-white max-w-full md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px]">
				<div className="p-4 bg-primary text-white">
					<h1 className="text-xl font-bold">CodeLeap Network</h1>
				</div>

				<div className="flex flex-col gap-4 p-4">
					<div className="border border-border rounded-lg p-4 flex flex-col gap-4">
						<h1 className="text-lg font-semibold">What's on your mind?</h1>
						<PostForm postId={postId} />
					</div>

					{posts?.results.map((post) => (
						<PostCard key={post.id} post={post} />
					))}
				</div>
			</div>
		</main>
	);
}
