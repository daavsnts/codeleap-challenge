import { getFromApi } from "@/services/utils";
import { getEmptyPaginatedData, type WrapperWithPagination } from "../common";
import type { Post } from "./models";

export const POSTS_TAG = "posts";

export async function getPosts() {
	return getFromApi<WrapperWithPagination<Post>>(
		"/careers/",
		getEmptyPaginatedData(),
	);
}
