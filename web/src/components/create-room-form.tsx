import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { useCreateRoom } from "@/http/use-create-room";
import { FormInput } from "./form/form-input";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";

const createRoomSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	description: z.string().optional(),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
	const { mutateAsync, isPending } = useCreateRoom();

	const form = useForm<CreateRoomFormData>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	function handleCreateRoom(data: CreateRoomFormData) {
		mutateAsync(data);

		form.reset();
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Create a new room</CardTitle>
				<CardDescription>
					Create a new room to start a make questions and receive answers from
					AI.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateRoom)}
						className="flex flex-col gap-4"
					>
						<FormInput<CreateRoomFormData>
							label="Room's name"
							name="name"
							placeholder="Type the room's name..."
							formControl={form.control}
						/>

						<FormInput<CreateRoomFormData>
							label="Room's description"
							name="description"
							type="textarea"
							placeholder="Type the room's description..."
							formControl={form.control}
						/>

						<Button
							type="submit"
							className="w-full cursor-pointer"
							disabled={isPending}
						>
							{isPending ? (
								<div className="flex items-center justify-center gap-2">
									<Loader2 className="animate-spin" /> Creating room
								</div>
							) : (
								"Create room"
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
