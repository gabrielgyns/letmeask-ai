# LetMeAsk AI

An AI-powered Q&A platform that allows users to create rooms, record audio content, and ask questions that get answered based on the audio context using vector similarity search. (Simple app for study based)

## About

## Projects

- [Server - Node](https://github.com/gabrielgyns/letmeask-ai/tree/main/server)
- [Web - React](https://github.com/gabrielgyns/letmeask-ai/tree/main/web)

## Techs & Specs

### Backend (Server)

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify with Zod validation
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: Google Gemini AI for transcription and embeddings
- **Vector Search**: PostgreSQL vector extension for similarity search
- **Development**: Biome for linting/formatting

**Key Features:**

- Audio transcription using Gemini AI
- Vector embeddings generation for semantic search
- Question answering based on audio context
- RESTful API with type-safe validation

### Frontend (Web)

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Development**: Biome for linting/formatting

**Key Features:**

- Modern, responsive UI with Tailwind CSS
- Real-time audio recording interface
- Type-safe API integration
- Form validation with Zod schemas

### Database Schema

- **Rooms**: Store room information (id, name, description, timestamps)
- **Questions**: Store user questions and AI responses
- **Audio Chunks**: Store transcribed audio with vector embeddings for similarity search

### AI Workflow

1. **Audio Upload**: Users record audio in rooms
2. **Transcription**: Gemini AI transcribes audio to text
3. **Embedding Generation**: Text is converted to vector embeddings
4. **Question Processing**: When users ask questions, the system:
   - Searches for similar content using vector similarity (threshold: 0.7)
   - If similarity found: Answers based on audio context
   - If no similarity: Answers using general AI knowledge

# Screenshots

| Description                                                                                                                            | Screenshot                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Rooms                                                                                                                                  | <img width="962" height="587" alt="image" src="https://github.com/user-attachments/assets/c88891d9-b5b4-44dc-ab73-424b73ab9f70" />  |
| Rooms                                                                                                                                  | <img width="936" height="457" alt="image" src="https://github.com/user-attachments/assets/52a8f467-ed4a-4f18-ab20-8bc640a6d55f" />  |
| Room w/ no questions                                                                                                                   | <img width="912" height="710" alt="image" src="https://github.com/user-attachments/assets/22aba794-ae0f-4542-8df4-54ebd159f3d1" />  |
| When we record an audio                                                                                                                | <img width="690" height="418" alt="image" src="https://github.com/user-attachments/assets/5f33cd66-a036-4558-bed9-edc4d0f11a51" />  |
| We separete it in chunks of audio trasncribing and extracting embeddings to handle searchs by vectors in postgresql                    | <img width="1660" height="346" alt="image" src="https://github.com/user-attachments/assets/4ce1bbe4-f051-456b-bead-8303eafe0f11" /> |
| Then, if we make a question related to the audio mentioned (where similarity using the embeddings got at least 0.7), AI will reply it. | <img width="906" height="808" alt="image" src="https://github.com/user-attachments/assets/d2f0fddd-449e-449d-aa5d-b622b7253bb1" />  |
| A future possible feature would be another person reply manually.                                                                      | <img width="938" height="1154" alt="image" src="https://github.com/user-attachments/assets/7589e577-c3c3-4f36-a1b5-295bdfcfc7d9" /> |
| If it does not find similarity, it will reply based on common knowledge from ai.                                                       | <img width="938" height="1154" alt="image" src="https://github.com/user-attachments/assets/7589e577-c3c3-4f36-a1b5-295bdfcfc7d9" /> |
