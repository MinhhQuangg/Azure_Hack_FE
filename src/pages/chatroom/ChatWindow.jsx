import { useState } from "react";
import Avatar from "./ReusableComponents";
import { IconButton } from "./ReusableComponents";
import { styles } from "../../styles";
import {
  FaPaperclip,
  FaImage,
  FaPaperPlane,
  FaEllipsisV,
  FaGlobe,
} from "react-icons/fa";

// Placeholder settings
const Settings = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="mt-6 flex justify-end">
        <div className="bg-white">Placeholder</div>
        <button
          onClick={onClose}
          className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-lg"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

// Message Bubble Component
const MessageBubble = ({ message }) => {
  // Typing indicator
  if (message.typing) {
    return (
      <div
        className={`flex mb-4 ${
          message.fromUser ? "justify-end" : "justify-start"
        }`}
      >
        {!message.fromUser && (
          <div className="mr-2">
            <Avatar
              color={message.senderColor}
              text={message.sender}
              size="sm"
            />
          </div>
        )}
        <div className="bg-gray-200 rounded-lg p-3 inline-block max-w-md">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">Person is typing...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex mb-4 ${
        message.fromUser ? "justify-end" : "justify-start"
      }`}
    >
      {!message.fromUser && (
        <div className="mr-2">
          <Avatar color={message.senderColor} text={message.sender} size="sm" />
        </div>
      )}
      <div
        className={`rounded-lg p-3 inline-block max-w-md ${
          message.fromUser
            ? "bg-yellow-300 text-black"
            : "bg-gray-200 text-black"
        }`}
      >
        {message.content}
        <div className="text-xs text-gray-600 mt-1 text-right">
          {message.timestamp
            ? new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({
  messages,
  currentChat,
  newMessage,
  setNewMessage,
  onSendMessage,
  messageContainerRef,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className={`${styles.paddingY} flex-1 flex flex-col bg-gray-50`}>
      {/* Chat Header */}
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            color={currentChat.avatarColor}
            text={currentChat.avatarText}
          />
          <div className="ml-3">
            <h2 className="font-semibold">{currentChat.name}</h2>
            <p className="text-xs text-gray-500">{currentChat.info || ""}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <IconButton icon={<FaGlobe />} />
            {/* <span className="text-gray-600 text-sm ml-1">English</span> */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <IconButton
            icon={<FaEllipsisV />}
            onClick={() => setIsSettingsOpen(true)}
          />
          <Settings
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto" ref={messageContainerRef}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t flex items-center">
        <IconButton icon={<FaPaperclip />} />
        <IconButton icon={<FaImage />} />
        <div className="flex-1 mx-2">
          <textarea
            className="border rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
        </div>
        <IconButton
          icon={<FaPaperPlane />}
          color={newMessage.trim() ? "text-yellow-500" : "text-gray-400"}
          onClick={onSendMessage}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
