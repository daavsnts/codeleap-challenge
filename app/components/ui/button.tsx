import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type React from "react";

const buttonVariants = cva("font-bold cursor-pointer transition disabled:bg-gray-400 disabled:cursor-not-allowed", {
	variants: {
		variant: {
			primary:
				"bg-primary text-primary-foreground rounded-lg px-6 py-2 hover:bg-primary-hover ",
			destructive:
				"bg-destructive text-destructive-foreground rounded-lg px-6 py-2 hover:bg-destructive-hover",
			success:
				"bg-success text-success-foreground rounded-lg px-6 py-2 hover:bg-success-hover",
			outline:
				"bg-white text-black border border-border rounded-lg px-6 py-2 hover:bg-gray-100",
			default: "",
		},
		size: {
			default: "text-base",
			sm: "text-sm",
			lg: "text-lg",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

function Button({
	className,
	variant,
	size,
	loading = false,
	disabled = false,
	children,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		loading?: boolean;
	}) {
	return (
		<button
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			disabled={disabled || loading}
			{...props}
		>
			{loading && <Loader2 className="animate-spin" />}

			{children}
		</button>
	);
}

export { Button, buttonVariants };
