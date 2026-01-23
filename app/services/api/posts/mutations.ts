import { sendToApi } from "@/services/utils";
import type { Post } from "./models";

export type CreatePostData = {
	username: string;
	title: string;
	content: string;
};

export type UpdatePostData = {
	id: number;
	title: string;
	content: string;
};

export async function createPost(data: CreatePostData): Promise<Post> {
	return sendToApi<Post>("/careers/", {
		body: data,
		method: "POST",
	});
}

export async function updatePost(data: UpdatePostData): Promise<Post> {
	const { id, ...body } = data;
	return sendToApi<Post>(`/careers/${id}/`, {
		body,
		method: "PATCH",
	});
}

export async function deletePost(id: number): Promise<void> {
	return sendToApi(`/careers/${id}/`, {
		method: "DELETE",
	});
}
