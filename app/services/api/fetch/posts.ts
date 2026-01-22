import { getFromApi } from "@/services/utils";
import type { Post, WrapperWithPagination } from "../models";
import { getEmptyPaginatedData } from "../mappers";

export const POSTS_TAG = "posts";
export async function getPosts() {
	return getFromApi<WrapperWithPagination<Post>>(
		"/careers/",
		getEmptyPaginatedData(),
	);
}
