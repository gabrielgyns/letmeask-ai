import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcribe the áudio in the language it is spoken, usually in English or Brazilian Portuguese. Be precise and natural in the transcribing. Keep the right pontuations and divide the text in paragraphs when appropriate. It may contains techinical words related to IT or other fields.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error("It wasn't possible to convert the audio.");
  }

  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('It was not possible generate the embeddings.');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n');

  const promptForGenerateAnswer = `
    Based on the given text as CONTEXT below, answer the QUESTION clearly and precisely in the language of the QUESTION.

    CONTEXT:
    ${context}

    QUESTION:
    ${question}

    INSTRUCTIONS:
    - Use information from the context sent.
    - If the answer is not found in the context, answer based on searches, but mention that this is information was probably not mentioned.
    - Be objective.
    - Keep an educative tone and professional.
    - Give text citation relavants from context if appropriate.
    - If you put a citation from context, mention: Content from audio (in the appropriated language).
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [{ text: promptForGenerateAnswer }],
  });

  if (!response.text) {
    throw new Error('Generation of an answer failed by Gemini.');
  }

  return response.text;
}
