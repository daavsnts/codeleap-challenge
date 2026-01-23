import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createPost,
	updatePost,
	deletePost,
	POSTS_TAG,
} from "@/services/api/posts";
import type { CreatePostData, UpdatePostData } from "@/services/api/posts";

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreatePostData) => createPost(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [POSTS_TAG] });
		},
	});
}

export function useUpdatePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: UpdatePostData) => updatePost(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [POSTS_TAG] });
		},
	});
}

export function useDeletePost() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [POSTS_TAG] });
		},
	});
}
