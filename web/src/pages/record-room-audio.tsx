import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const isRecordingSupported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
	const [isRecording, setIsRecording] = useState(false);
	const recorder = useRef<MediaRecorder | null>(null);

	const { roomId } = useParams<{ roomId: string }>();

	async function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}
	}

	async function uploadAudio(audio: Blob) {
		const formData = new FormData();
		formData.append("file", audio, "audio.webm");

		const response = await fetch(
			`http://localhost:3333/rooms/${roomId}/audio`,
			{
				method: "POST",
				body: formData,
			},
		);

		const result = await response.json();

		console.log(result);
	}

	async function startRecording() {
		if (!isRecordingSupported) {
			alert("Your browser does not support recording.");
			return;
		}

		setIsRecording(true);

		const audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44_100,
			},
		});

		recorder.current = new MediaRecorder(audio, {
			mimeType: "audio/webm",
			audioBitsPerSecond: 64_000,
		});

		recorder.current.ondataavailable = (event) => {
			if (event.data.size > 0) {
				uploadAudio(event.data);
			}
		};

		recorder.current.onstart = (event) => {
			console.log("⏺ Recording started!");
		};

		recorder.current.onstop = (event) => {
			console.log("⏹ Recording stopped/paused!");
		};

		recorder.current.start();
	}

	return (
		<div className="h-screen flex items-center justify-center gap-3 flex-col">
			{isRecording ? (
				<Button onClick={stopRecording}>Stop recording</Button>
			) : (
				<Button onClick={startRecording}>Record audio</Button>
			)}

			{isRecording ? <p>Recording...</p> : <p>Paused</p>}
		</div>
	);
}
