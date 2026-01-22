import type { Route } from "./+types/main";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Sign Up - CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

export default function SignUp() {
  return <h1>SignUp</h1>;
}
