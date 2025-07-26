import type { ComponentProps } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	label: string;
	name: TName;
	type?: "input" | "textarea";
	placeholder?: string;
	formControl: Control<TFieldValues>;
	fieldClassName?: string;
	disabled?: boolean;
}

export function FormInput<
	TTFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TTFieldValues> = FieldPath<TTFieldValues>,
>({
	label,
	name,
	placeholder,
	formControl,
	fieldClassName,
	type = "input",
	disabled = false,
}: Props<TTFieldValues, TName>) {
	return (
		<FormField
			control={formControl}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{type === "input" ? (
							<Input
								{...field}
								placeholder={placeholder}
								className={fieldClassName}
								disabled={disabled}
							/>
						) : (
							<Textarea
								{...field}
								placeholder={placeholder}
								className={fieldClassName}
								disabled={disabled}
							/>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
