import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room-container">
          <label htmlFor="room-input">Enter Room Name:</label>
          <input
            id="room-input"
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="e.g. developers"
          />
          <button
            onClick={() => {
              if (room.trim()) setIsInChat(true);
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <div className="chat-page">
          <button className="back-button" onClick={() => setIsInChat(false)}>
            ⬅ Back
          </button>
          <Chat room={room} />
        </div>
      )}
    </AppWrapper>
  );
}

export default ChatApp;
