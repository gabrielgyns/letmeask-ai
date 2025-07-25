import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Room {
	id: string;
	name: string;
}

export function Rooms() {
	const { data: rooms } = useQuery({
		queryKey: ["rooms"],
		queryFn: async () => {
			const response = await fetch("http://localhost:3333/rooms");
			const result: Room[] = await response.json();

			return result;
		},
	});

	return (
		<div>
			{rooms?.map((room) => (
				<div key={room.id}>
					<Link to={`/room/${room.id}`} className="hover:underline">
						{room.name}
					</Link>
				</div>
			))}
		</div>
	);
}
