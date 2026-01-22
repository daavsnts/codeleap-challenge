import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Button, Input } from "../ui";
import { useAuth } from "@/hooks";

const signUpSchema = z
	.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters long")
			.max(20, "Username must be at most 20 characters long")
			.regex(
				/^[a-zA-Z0-9_]+$/,
				"Username can only contain letters, numbers, and underscores",
			),
	})
	.required();

type SignUpData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
	const { handleLogin } = useAuth();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<SignUpData>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			username: "",
		},
	});

	function onSubmit(data: SignUpData) {
		handleLogin(data.username);
		toast.success(`Welcome, ${data.username}!`);
		navigate("/main");
	}

	const username = watch("username");

	const formHasErrors =
		username.trim().length < 3 || Object.keys(errors).length > 0;

	return (
		<div className="p-4 rounded-xl bg-card border border-border h-fit flex flex-col gap-4 w-full sm:max-w-[400px]">
			<h1 className="text-xl font-bold">Welcome to CodeLeap Network!</h1>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<Input
						label="Please enter your username"
						placeholder="e.g. johndoe123"
						{...register("username")}
						error={errors?.username?.message}
					/>
				</div>

				<div className="w-full flex justify-end">
					<Button disabled={formHasErrors} type="submit" variant="primary">
						Enter
					</Button>
				</div>
			</form>
		</div>
	);
}
