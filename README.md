# Firebase React Chat App

A simple, real-time chat application built with React and Firebase that supports Google Sign-In and room-based messaging. Users sign in with Google, enter a room number (e.g., 2), and chat with others in the same room in real time.

## Features
- Google Sign-In with Firebase Authentication.
- Room-based chat: join by entering a numeric or text room ID.
- Real-time messaging powered by Firebase Firestore.
- Client-side routing and protected routes for authenticated users.
- Clean, responsive UI with basic styling (customizable).

## Demo (Optional)
- Add screenshots or a short screen recording here.

## Tech Stack
- React (Vite or Create React App)
- Firebase (Auth, Firestore)
- React Router (optional, if used)
- CSS/Tailwind/Chakra (optional)

## Getting Started

### Prerequisites
- Node.js >=16 and npm or yarn installed.
- A Firebase project with Web app configured.
- Enabled Firebase Authentication (Google provider).
- A Firestore database in test or production mode.

### 1) Clone the repository
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2) Install dependencies
```bash
# npm
npm install
# or yarn
yarn
```

### 3) Configure Firebase
Create a Firebase project at console.firebase.google.com, add a Web app, and copy the config object.
Create a file for environment variables:

- If using Vite:
  - Create .env.local in the project root:
    ```
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_project.appspot.com
    VITE_MESSAGING_SENDER_ID=your_sender_id
    VITE_APP_ID=your_app_id
    ```
- If using Create React App:
  - Create .env.local:
    ```
    REACT_APP_API_KEY=your_api_key
    REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
    REACT_APP_PROJECT_ID=your_project_id
    REACT_APP_STORAGE_BUCKET=your_project.appspot.com
    REACT_APP_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_APP_ID=your_app_id
    ```

Update firebase.js (or src/lib/firebase.js) to read from env vars and initialize Firebase.

### 4) Enable Google Sign-In
- In Firebase Console > Authentication > Sign-in method > Enable Google provider.
- Add an authorized domain if required (e.g., localhost, your deploy domain).

### 5) Set up Firestore
- Firebase Console > Firestore Database > Create database.
- Example security rules for room-based chat (adjust for production):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId}/messages/{messageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
This allows authenticated users to read/write messages within any room; tighten as needed.

### 6) Run the app
```bash
# Vite
npm run dev
# CRA
npm start
```

App runs at http://localhost:5173 (Vite) or http://localhost:3000 (CRA).

## Usage

1) Click “Sign in with Google” to authenticate.
2) Enter a room number or ID (e.g., 2) to join that chat room.
3) Start sending messages; anyone who joins the same room ID can chat together in real time.
4) Use “Leave Room” or “Sign out” to exit.

## Project Structure (example)
```
src/
  components/
    AuthButton.jsx
    ChatRoom.jsx
    Message.jsx
    RoomForm.jsx
  pages/
    Home.jsx
    Room.jsx
  lib/
    firebase.js
  App.jsx
  main.jsx
```
- firebase.js: Firebase initialization (Auth, Firestore).
- AuthButton: Handles Google sign-in/sign-out.
- RoomForm: Input for room ID to join.
- ChatRoom: Subscribes to Firestore messages, renders and sends messages.
- Message: Displays a single message bubble.

## Scripts
```bash
# Start dev server
npm run dev     # Vite
npm start       # CRA

# Build production
npm run build

# Preview production build (Vite)
npm run preview

# Lint (if configured)
npm run lint
```

## Environment Variables
- VITE_*/REACT_APP_* variables must be prefixed correctly to be exposed to the client.
- Never commit .env files; use .gitignore.

## Firestore Data Model (example)
- Collection: rooms
  - Document: {roomId}
    - Subcollection: messages
      - Document fields:
        - text: string
        - uid: string (sender’s user id)
        - displayName: string
        - photoURL: string
        - createdAt: server timestamp
This structure scopes messages to a room and allows simple queries/sorting by createdAt.

## Key Components (usage details)

- Google Sign-In
  - Use signInWithPopup(auth, new GoogleAuthProvider()) to authenticate.
  - Store user info (uid, displayName, photoURL) from auth.currentUser.

- Join Room
  - Simple input field for room ID; navigate to /room/:roomId or set state.
  - Validate non-empty and trim spaces; allow numeric or text room IDs.

- Real-time Chat
  - Firestore query: collection(db, "rooms", roomId, "messages"), orderBy("createdAt"), limit(100).
  - Subscribe with onSnapshot to stream updates in real time.
  - Add messages with addDoc and serverTimestamp().

## Deployment
- Vercel/Netlify: set environment variables in project settings and redeploy.
- Firebase Hosting: run
```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```
Configure public/build directories according to Vite/CRA.

## Security & Best Practices
- Restrict Firestore rules for production; consider per-room ACLs or write rules to allow only room members to write.
- Validate message length and sanitize inputs client-side.
- Avoid exposing sensitive keys (Firebase config is public, but restrict rules and domains).
- Consider pagination for large rooms (query with limit/next page).

## Troubleshooting
- auth/unauthorized-domain: Add domain in Firebase Auth settings.
- Permission denied: Check Firestore rules and ensure request.auth != null.
- Messages not in order: Ensure createdAt uses serverTimestamp() and query orderBy("createdAt").

## Roadmap (Optional)
- Typing indicators, message reactions, presence.  
- Room invitations and membership lists.  
- File/image uploads with Firebase Storage.  
- Push notifications with FCM.

## Acknowledgments
- Firebase Auth, Firestore, and React community.
- Add real screenshots, and tweak sections to match actual implementation.

Citations:
 Firebase Authentication with Google provider (setup and usage).
 Room joining via client input and route/state handling.
 Firestore real-time queries, onSnapshot, addDoc, serverTimestamp.
 Protected routes pattern in React apps.
 UI layer and styling approach.
 Demo section usage.
 React app scaffolding and scripts (Vite/CRA).
 Firebase app initialization in React.
 React Router usage.
 Styling frameworks.
 Node.js and package managers.
 Firebase project creation and web config.
 Enable Google provider and authorized domains.
 Firestore database creation and rules.
