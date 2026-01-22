import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type React from "react";

function DialogOverlay({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-overlay"
			className={cn(
				"fixed inset-0 w-screen h-screen bg-black/50 flex items-center justify-center z-[1000] p-4",
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-content"
			className={cn(
				"bg-white rounded-lg p-4 shadow-lg flex gap-4 flex-col",
				"sm:max-w-[90%] md:max-w-md lg:max-w-lg xl:max-w-xl w-full",
				className,
			)}
			{...props}
		/>
	);
}

function DialogHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("w-full flex justify-between items-center", className)}
			{...props}
		/>
	);
}

function DialogTitle({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-title"
			className={cn("font-bold text-lg w-60 truncate", className)}
			{...props}
		/>
	);
}

function DialogClose({
	className,
	...props
}: React.ComponentProps<"button">) {
	return (
		<button
			data-slot="dialog-close"
			type="button"
			className={cn("text-lg cursor-pointer", className)}
			aria-label="Close"
			{...props}
		>
			<X />
		</button>
	);
}

function DialogBody({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-body"
			className={cn("", className)}
			{...props}
		/>
	);
}

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title?: string;
	children: React.ReactNode;
	className?: string;
}

function Dialog({
	open,
	onOpenChange,
	title,
	children,
	className,
}: DialogProps) {
	if (!open) return null;

	return (
		<DialogOverlay onClick={() => onOpenChange(false)}>
			<DialogContent className={className} onClick={(e) => e.stopPropagation()}>
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}
					<DialogClose onClick={() => onOpenChange(false)} />
				</DialogHeader>

				<DialogBody>{children}</DialogBody>
			</DialogContent>
		</DialogOverlay>
	);
}

export {
	Dialog,
	DialogOverlay,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogBody,
};
