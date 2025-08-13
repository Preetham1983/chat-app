// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase-config";
// import {
//   collection,
//   addDoc,
//   where,
//   serverTimestamp,
//   onSnapshot,
//   query,
//   orderBy,
// } from "firebase/firestore";

// import "../styles/Chat.css";

// export const Chat = ({ room }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesRef = collection(db, "messages");

//   useEffect(() => {
//     const queryMessages = query(
//       messagesRef,
//       where("room", "==", room),
//       orderBy("createdAt")
//     );
//     const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
//       let messages = [];
//       snapshot.forEach((doc) => {
//         messages.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(messages);
//       setMessages(messages);
//     });

//     return () => unsuscribe();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (newMessage === "") return;
//     await addDoc(messagesRef, {
//       text: newMessage,
//       createdAt: serverTimestamp(),
//       user: auth.currentUser.displayName,
//       room,
//     });

//     setNewMessage("");
//   };

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <h1>Welcome to: {room.toUpperCase()}</h1>
//       </div>
//       <div className="messages">
//         {messages.map((message) => (
//           <div key={message.id} className="message">
//             <span className="user">{message.user}:</span> {message.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(event) => setNewMessage(event.target.value)}
//           className="new-message-input"
//           placeholder="Type your message here..."
//         />
//         <button type="submit" className="send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase-config";
// import {
//     collection,
//     addDoc,
//     where,
//     serverTimestamp,
//     onSnapshot,
//     query,
//     orderBy,
//     deleteDoc,
//     doc,
// } from "firebase/firestore";

// import "../styles/Chat.css";

// export const Chat = ({ room }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const messagesRef = collection(db, "messages");

//     useEffect(() => {
//         const queryMessages = query(
//             messagesRef,
//             where("room", "==", room),
//             orderBy("createdAt")
//         );
//         const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
//             const loadedMessages = [];
//             snapshot.forEach((doc) => {
//                 loadedMessages.push({ ...doc.data(), id: doc.id });
//             });
//             setMessages(loadedMessages);
//         });

//         return () => unsubscribe();
//     }, [room]);

//     const deleteMessage = async (id) => {
//         if (window.confirm("Are you sure you want to delete this message?")) {
//             const messageDoc = doc(db, "messages", id);
//             await deleteDoc(messageDoc);
//             // The setMessages call to update the UI immediately after deletion is removed
//             // since the onSnapshot listener will automatically handle UI updates.
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (newMessage.trim() === "") return;

//         await addDoc(messagesRef, {
//             text: newMessage.trim(),
//             createdAt: serverTimestamp(),
//             user: auth.currentUser.displayName,
//             room,
//         });

//         setNewMessage("");
//     };

//     return (
//         <div className="chat-app">
//             <div className="header">
//                 <h1>Welcome to: {room.toUpperCase()}</h1>
//             </div>
//             <div className="messages">
//                 {messages.map((message) => (
//                     <div key={message.id} className="message">
//                         <span className="user">{message.user}:</span> {message.text}
//                         {auth.currentUser && message.user === auth.currentUser.displayName && (
//                             <button onClick={() => deleteMessage(message.id)} className="delete-button">Delete</button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit} className="new-message-form">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="new-message-input"
//                     placeholder="Type your message here..."
//                 />
//                 <button type="submit" className="send-button">
//                     Send
//                 </button>
//             </form>
//         </div>
//     );
// };
// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase-config";
// import {
//     collection,
//     addDoc,
//     where,
//     serverTimestamp,
//     onSnapshot,
//     query,
//     orderBy,
//     deleteDoc,
//     doc,
// } from "firebase/firestore";

// import "../styles/Chat.css";

// export const Chat = ({ room }) => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState("");
//     const messagesRef = collection(db, "messages");

//     useEffect(() => {
//         const q = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
//         const unsubscribe = onSnapshot(q, (querySnapshot) => {
//             const msgs = [];
//             querySnapshot.forEach((doc) => {
//                 msgs.push({ ...doc.data(), id: doc.id });
//             });
//             setMessages(msgs);
//         });

//         return () => unsubscribe();
//     }, [room]);

//     const copyToClipboard = (text) => {
//         navigator.clipboard.writeText(text).then(() => {
//             alert("Text copied to clipboard");
//         });
//     };

//     const deleteMessage = async (id) => {
//         if (window.confirm("Are you sure you want to delete this message?")) {
//             await deleteDoc(doc(db, "messages", id));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!newMessage.trim()) return;
//         await addDoc(messagesRef, {
//             text: newMessage.trim(),
//             createdAt: serverTimestamp(),
//             user: auth.currentUser.displayName,
//             room,
//         });
//         setNewMessage("");
        
//     };

//     return (
//         <div className="chat-app">
//             <div className="header">
//                 <h1>Welcome to: {room.toUpperCase()}</h1>
//             </div>
//             <div className="messages">
//                 {messages.map((message) => (
//                     <div key={message.id} className="message">
//                         <span className="user">{message.user}:</span>
//                         {message.text}
//                         <span className="message-actions">
//                             <i className="material-icons" onClick={() => copyToClipboard(message.text)}>content_copy</i>
//                             {auth.currentUser && message.user === auth.currentUser.displayName && (
//                                 <i className="material-icons" onClick={() => deleteMessage(message.id)}>delete</i>
//                             )}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={handleSubmit} className="new-message-form">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     className="new-message-input"
//                     placeholder="Type your message here..."
//                 />
//                 <button type="submit" className="send-button">
//                     Send
//                 </button>
//             </form>
//         </div>
//     );
// };


import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });

    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, []);

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "messages", id));
        setDropdownOpenId(null);
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("Failed to delete message");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>{room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => {
          const isCurrentUser =
            auth.currentUser &&
            message.user === auth.currentUser.displayName;

          return (
            <div
              key={message.id}
              className={`message ${isCurrentUser ? "current-user" : ""}`}
            >
              <span className="user">{message.user}:</span>
              {message.text}

              {isCurrentUser && (
                <>
                  {/* <span
                    className="message-options"
                    onClick={() => toggleDropdown(message.id)}
                  >
                    ⋮
                  </span> */}

                  {dropdownOpenId === message.id && (
                    <div className="message-dropdown show">
                      <div onClick={() => deleteMessage(message.id)}>Delete</div>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
          disabled={isSending}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!newMessage.trim() || isSending}
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};
