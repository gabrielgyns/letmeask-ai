import { useParams } from "react-router-dom";

export function Room() {
	const { roomId } = useParams<{ roomId: string }>();

	return <div>Room: {roomId}</div>;
}
