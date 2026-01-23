import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createPost,
	updatePost,
	deletePost,
	POSTS_TAG,
} from "@/services/api/posts";
import type { CreatePostData, UpdatePostData } from "@/services/api/posts";
import { revalidateClientTags } from "@/services/utils";

export function useCreatePost() {
	return useMutation({
		mutationFn: (data: CreatePostData) => createPost(data),
		onSuccess: () => {
			revalidateClientTags([POSTS_TAG]);
		},
	});
}

export function useUpdatePost() {
	return useMutation({
		mutationFn: (data: UpdatePostData) => updatePost(data),
		onSuccess: () => {
			revalidateClientTags([POSTS_TAG]);
		},
	});
}

export function useDeletePost() {
	return useMutation({
		mutationFn: (id: number) => deletePost(id),
		onSuccess: () => {
			revalidateClientTags([POSTS_TAG]);
		},
	});
}
