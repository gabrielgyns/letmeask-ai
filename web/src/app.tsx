import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/room";
import { Rooms } from "./pages/rooms";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Rooms />} />
					<Route path="/room/:roomId" element={<Room />} />
					<Route path="/create-room" element={<CreateRoom />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}
