import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Room } from "./pages/room";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route index element={<CreateRoom />} />
					<Route path="/rooms/:roomId" element={<Room />} />
					<Route path="/rooms/:roomId/audio" element={<RecordRoomAudio />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
