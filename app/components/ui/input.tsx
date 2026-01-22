import { cn } from "@/lib/utils";
import type React from "react";

function InputWrapper({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="input-wrapper"
			className={cn("flex flex-col gap-1", className)}
			{...props}
		/>
	);
}

interface InputFieldProps extends React.ComponentProps<"input"> {
	error?: boolean;
}

function InputField({ className, error, ...props }: InputFieldProps) {
	return (
		<input
			data-slot="input-field"
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

interface InputProps extends React.ComponentProps<"input"> {
	label?: string;
	error?: string;
}

function Input({ label, error, id, className, ...props }: InputProps) {
	return (
		<InputWrapper>
			{label && (
				<label data-slot="input-label" htmlFor={id} className="font-medium">
					{label}
				</label>
			)}
			<InputField id={id} error={!!error} className={className} {...props} />
			{error && (
				<span data-slot="input-error" className="text-xs text-destructive-hover mt-0.5">
					* {error}
				</span>
			)}
		</InputWrapper>
	);
}

export { Input, InputWrapper, InputField };
