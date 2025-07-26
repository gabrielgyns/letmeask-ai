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
							/>
						) : (
							<Textarea
								{...field}
								placeholder={placeholder}
								className={fieldClassName}
							/>
						)}
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
