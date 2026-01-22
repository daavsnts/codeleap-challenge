import { PostFormContent } from "./content";

type PostFormProps = {
  // TODO: Implement edit functionality
	postId?: string;
};

export function PostForm({ postId }: PostFormProps) {
	return <PostFormContent />;
}
