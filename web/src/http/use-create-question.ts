import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useCreateQuestion(roomId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateQuestionRequest) => {
			const response = await fetch(
				`http://localhost:3333/rooms/${roomId}/questions`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				},
			);

			const result: { questionId: string; answer: string } =
				await response.json();

			return result;
		},
		onMutate({ question }) {
			const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
				"get-questions",
				roomId,
			]);

			const questionsArray = questions ?? [];
			const newQuestion = {
				id: crypto.randomUUID(), // temporary
				question,
				answer: null,
				createdAt: new Date().toISOString(),
				isGeneratingAnswer: true,
			};

			queryClient.setQueryData<GetRoomQuestionsResponse>(
				["get-questions", roomId],
				[newQuestion, ...questionsArray],
			);

			return { newQuestion, questions }; // Added to a context that can be accessed.
		},
		onError(_error, _variables, context) {
			if (context?.questions) {
				queryClient.setQueryData<GetRoomQuestionsResponse>(
					["get-questions", roomId],
					context.questions,
				);
			}
		},
		onSuccess(data, _variables, context) {
			// queryClient.invalidateQueries({ queryKey: ["get-questions", roomId] });
			queryClient.setQueryData<GetRoomQuestionsResponse>(
				["get-questions", roomId],
				(questions) => {
					if (!questions) {
						return questions;
					}

					if (!context.newQuestion) {
						return questions;
					}

					return questions.map((question) => {
						if (question.id === context.newQuestion.id) {
							return {
								...context.newQuestion,
								id: data.questionId,
								answer: data.answer,
								isGeneratingAnswer: false,
							};
						}

						return question;
					});
				},
			);
		},
	});
}
