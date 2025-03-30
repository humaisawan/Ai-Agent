# AI-Powered Q&A Agent


A web application that leverages AI (Gemini's 2.0-flash Model) to provide contextual question answering with conversation history management.

## Features

- 💬 Real-time AI-powered chat interface
- 📚 Conversation history with context preservation
- ⚡ Dynamic UI updates without page reloads
- 🔍 Search Conversations (Additional Feature)

## Technologies Used

### Frontend
- **React** - UI framework
- **Redux Toolkit** - State management
- **Axios** - API communication
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (conversation storage)
- **Mongoose** - ODM for MongoDB
- **Gemini API** - AI integration

## Installation

### Prerequisites
- Node.js (v18+)
- NPM installed
- MongoDB Atlas account or local MongoDB instance (You dont neccessarily need it because for simplicity sake I have pushed my env file aswell so you can test with ease without having to change credentials)
- Gemini API key (You dont neccessarily need it because for simplicity sake I have pushed my env file aswell so you can test with ease without having to change credentials)

### Backend Setup

1. Clone repository:
```bash
git clone https://github.com/humaisawan/Ai-Agent.git
cd ai-agent-backend
```
2- Install Dependencies:
```bash
npm install
```
3- Start the backend server (it will run on http://localhost:3000):
```bash
npm start
```

### Frontend Setup

1. Open New Terminal And Navigate to the frontend directory:
```bash
cd ai-agent
```
2- Install Dependencies:
```bash
npm install
```
3- Start the frontend server (it will run on http://localhost:5173):
```bash
npm run dev
```

## Usage

1. Create a new chat from the sidebar
2. Type your question in the input box
3. Press Enter or click Send to get AI response
4. View conversation history in the sidebar
5. Switch between different chat sessions
6. Search from the sidebar based on the chat title.


## Documentation

### AI Integration
- Uses Gemini's 2.0-flash Model model
- Conversation history is sent as context with each request

### Conversation Management
- **Frontend**: 
  - Redux store for chat history
  - Local component state for active conversation
  
- **Backend**:
  - MongoDB for persistent storage
  - REST API endpoints for creating and fetching chats and messages
  - google/generative-ai SDK for interacting with Gemini Model

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `api/v1/chats` | GET | Get all chats |
| `api/v1/chats/create` | POST | Create new chat |
| `api/v1/chats/:id` | GET | Get chat messages |
| `api/v1/messages/create/:chatId` | POST | Create new message |

## Challenges & Solutions

 **Real-time UI Updates**
   - Challenge: Updating Conversations UI on the sidebar without page reload (lastMessage and lastMessageTime)
   - Solution: Used Redux for global state management of conversations rather than using a local state variable.



Contact
Humais Awan - https://www.humais.dev/ - humaisawan0@gmail.com

Project Link: https://github.com/humaisawan/Ai-Agent
