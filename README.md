# Chatlas Frontend

## Inspiration
Chatlas is inspired by the growing need for seamless communication in a globalized world where language differences often create barriers. We wanted to build a tool that connects people across languages—whether for casual chats, international collaboration, or community engagement—making it feel like everyone is speaking the same language.

## What It Does
Chatlas is a real-time group chat web application that automatically translates messages into the preferred language of each participant. Users can create or join chat rooms via unique invitation links and communicate freely, regardless of the language they use.

### Key Features
- **Real-Time Messaging**: Powered by WebSockets (Socket.IO) for instant communication.
- **Auto-Translation**: Messages are translated in real time using Azure AI Translator to match the recipient's language preference.
- **Speech-to-Text**: Users can convert their voice to text using Azure Speech Service.
- **Secure Authentication**: Sign-in and sign-up with Google OAuth, using JWT for session handling.
- **Invite System**: Every chat room generates a unique link that users can share to invite others.
- **Persistent History**: Rooms are persistent—users can leave and return later with full message history preserved.
- **Lazy Load Messages**: Older messages are loaded on scroll, improving performance and user experience, especially in large conversations.

## How We Built It
We developed Chatlas using a full-stack approach:

- **Frontend**: React (Vite) and Tailwind CSS for UI/UX.
- **Backend**: Node.js and Express.js handle the API and real-time socket connections.
- **Database**: Azure Cosmos DB for PostgreSQL stores user, room, and message data.
- **Authentication**: Google OAuth2 with JWT-based sessions ensures security.
- **AI Services**: Azure Translator for real-time multilingual support, Azure Speech Service for converting speech to text.
- **Development Tools**: We used GitHub Copilot throughout development to boost our productivity and streamline code generation.

## Challenges We Ran Into
The app uses a Client-Server architecture, with WebSocket (Socket.IO) handling real-time communication. Each message is first stored in its original language, then translated and delivered to users in their chosen language. The system supports language preference changes mid-conversation, affecting only future messages.

## Accomplishments That We're Proud Of
- Successfully built a full-stack chat app with auto-translation.
- Integrated Azure AI services for both text translation and speech-to-text.
- Achieved seamless sign-in/sign-up flow with Google OAuth and secure sessions.
- Built a robust invitation system with dynamic room links and user management.

## What We Learned
- How to work with Azure Cognitive Services (Translation & Speech APIs).
- Setting up OAuth with secure session handling using JWT.
- Collaborative full-stack development using GitHub and Copilot.
- Handling WebSocket communication for real-time updates.

## What's Next for Chatlas
- Add support for chat summarization using Azure OpenAI.
- Implement file sharing in rooms (or emotes sending).
- Improve testing coverage and CI/CD pipeline.
- Add analytics to understand language usage and user behavior.
- Explore additional security enhancements and performance optimizations.
- Deployment on Azure with Docker containers.

## Built With
- Azure (Azure AI Services)
- Express.js
- Node.js
- React
- WebSocket (Socket.IO)
- PostgreSQL

## Try It Out
- [Demo Video](https://www.youtube.com/watch?v=Q3Jx4viHm-g)
- [Figma Design](https://www.figma.com/design/ASHnFz7S1Fb0QeD3OFd9yf/Azure-AI-Hackathon?node-id=0-1&p=f&t=VsNwiJKGRJSAzFw0-0)

## Running the App
To run the app locally, follow these steps:
**1. Navigate to your desired directory and clone the frontend repository**

```
git clone https://github.com/MinhhQuangg/Azure_Hack_FE.git
```

**2. Create a `.env` file in the root directory and add the following environment variables**

```
REACT_APP_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
VITE_SPEECH_REGION=eastus
VITE_EMAILJS_PUBLIC_KEY=<YOUR_EMAILJS_PUBLIC_KEY>
VITE_EMAILJS_SERVICE_ID=<YOUR_EMAILJS_SERVICE_ID>
VITE_EMAILJS_TEMPLATE_ID=<YOUR_EMAILJS_TEMPLATE_ID>
VITE_TRANS_KEY=<YOUR_TRANS_KEY>
VITE_TRANS_REGION=eastus
```

**3. Install dependencies and start the development server**

```
npm install
npm run dev
```

## Connect with Backend to Run the Full App:
To run Chatlas fully, set up the frontend by following instructions in the **[Backend Repository](https://github.com/MinhhQuangg/Azure_App_BE)**.

## Note
Ensure you have Node.js installed before running the commands.
