import { cn } from "@/lib/utils";
import type React from "react";

function TextareaWrapper({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="textarea-wrapper"
			className={cn("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

interface TextareaFieldProps extends React.ComponentProps<"textarea"> {
	error?: boolean;
}

function TextareaField({ className, error, ...props }: TextareaFieldProps) {
	return (
		<textarea
			data-slot="textarea-field"
			aria-invalid={error}
			className={cn(
				"border border-gray-500 rounded-lg p-2",
				error && "ring-2 ring-destructive",
				className
			)}
			{...props}
		/>
	);
}

interface TextareaProps extends React.ComponentProps<"textarea"> {
	label?: string;
	error?: string;
}

function Textarea({ label, error, id, className, ...props }: TextareaProps) {
	return (
		<TextareaWrapper>
			{label && (
				<label
					data-slot="textarea-label"
					htmlFor={id}
					className="font-medium"
				>
					{label}
				</label>
			)}
			<TextareaField id={id} error={!!error} className={className} {...props} />
			{error && (
				<span data-slot="textarea-error" className="text-xs text-destructive-hover mt-0.5">
					* {error}
				</span>
			)}
		</TextareaWrapper>
	);
}

export { Textarea, TextareaWrapper, TextareaField };
