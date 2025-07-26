import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "@/http/use-rooms";
import { formatRelativeDate } from "@/utils/dayjs";
import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function RoomList() {
	const { data: rooms, isLoading: isLoadingRooms } = useRooms();

	if (isLoadingRooms) {
		return (
			<div className="flex items-center justify-center p-4">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Latest rooms</CardTitle>
				<CardDescription>Fast access to latest created rooms</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				{rooms?.map((room) => (
					<Link
						key={room.id}
						to={`/rooms/${room.id}`}
						className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
					>
						<div className="flex-1 flex flex-col gap-1">
							<h3 className="font-medium">{room.name}</h3>

							<div className="flex items-center gap-2">
								<Badge variant="secondary" className="text-xs">
									{room.questionCount} question(s)
								</Badge>

								<Badge variant="secondary" className="text-xs">
									Created {formatRelativeDate(room.createdAt)}
								</Badge>
							</div>
						</div>

						<span className="flex items-center gap-1 text-sm">
							Entrar
							<ArrowRight className="size-3" />
						</span>
					</Link>
				))}
			</CardContent>
		</Card>
	);
}
