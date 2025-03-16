import React from "react";
import NavBar2 from "../components/NavBar2";
import { styles } from "../styles";
import { hero } from "../assets";

const ChatApp = () => {
  return (
    <div className="flex h-screen">
      <NavBar2 />
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

const Sidebar = () => {
  const chats = [
    { id: 1, name: "Group 1", lastMessage: "Hello, there!", time: "30m" },
    { id: 2, name: "Chat 2", lastMessage: "hello", time: "32m" },
    { id: 3, name: "Chat 3", lastMessage: "hello", time: "35m" },
  ];

  return (
    <div
      className={`${styles.paddingPageX} ${styles.paddingY} mt-5 w-1/4 p-4 border-r`}
    >
      <h2 className="text-lg font-bold">Chats</h2>
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 my-2 rounded border"
      />
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="p-2 hover:bg-gray-200 cursor-pointer rounded"
        >
          <p className="font-semibold">{chat.name}</p>
          <p className="text-sm text-gray-600">
            {chat.lastMessage} • {chat.time}
          </p>
        </div>
      ))}
    </div>
  );
};

const ChatWindow = () => {
  const messages = [
    { id: 1, text: "Hello, there! How are you doing?", sender: "other" },
    { id: 2, text: "Would you like to learn about...", sender: "other" },
    { id: 3, text: "Your car’s extended warranty?", sender: "other" },
    { id: 4, text: "My car’s extended warranty...?", sender: "self" },
  ];

  return (
    <div
      className={`${styles.paddingPageX} ${styles.paddingY} flex flex-col w-3/4 h-screen`}
    >
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};

const MessageBubble = ({ text, sender }) => {
  return (
    <div
      className={`my-2 flex ${
        sender === "self" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 rounded-lg ${
          sender === "self" ? "bg-yellow-300" : "bg-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatApp;
