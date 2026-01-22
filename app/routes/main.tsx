import type { Route } from "./+types/main";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

export default function Main() {
  return <h1>Main</h1>;
}
