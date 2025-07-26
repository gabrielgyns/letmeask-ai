export type GetRoomQuestionsResponse = Array<{
	id: string;
	question: string;
	answer: number | null;
	createdAt: string;
}>;
