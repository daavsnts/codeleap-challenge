import { SignUpForm } from "./components";
import type { Route } from "../+types/main";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Sign Up - CodeLeap Network" },
		{ name: "description", content: "Welcome to CodeLeap Network!" },
	];
}

export default function SignUp() {
	return (
		<main className="flex min-h-screen w-full items-center justify-center p-4">
			<SignUpForm />
		</main>
	);
}
