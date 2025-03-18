import React, { useState, useEffect, useRef } from "react";
import Avatar from "../components/chatroom/ReusableComponents.jsx";
import Sidebar from "../components/chatroom/Sidebar.jsx";
import ChatWindow from "../components/chatroom/ChatWindow.jsx";
import { CHATS_DATA, MESSAGES_DATA } from "../components/chatroom/Data.jsx";
import ChatInfo from "../components/chatroom/ChatInfo.jsx";
import NavBar from "../components/NavBar.jsx";
import { FaTimes } from "react-icons/fa";

const EmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Welcome to Chatlas!
        </h2>
        <p className="text-gray-500 mb-6">
          Select a conversation or start a new one
        </p>
        <button className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-full font-medium transition">
          Start New Chat
        </button>
      </div>
    </div>
  );
};

// Modal component for creating new chats
const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatName.trim()) return;

    onCreateChat({
      name: chatName,
      members: selectedUsers,
    });

    setChatName("");
    setSelectedUsers([]);
    onClose();
  };

  // Test users
  const availableUsers = [
    { id: 1, name: "Alice", avatar: "A", color: "bg-purple-400" },
    { id: 2, name: "Bob", avatar: "B", color: "bg-green-400" },
    { id: 3, name: "Charlie", avatar: "C", color: "bg-blue-400" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg">
        <div className="font-['Montserrat'] p-4 border-b flex justify-between items-center relative">
          <h2 className="text-xl font-bold">New Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="font-['Montserrat'] text-[#2C2E30] block text-sm font-bold mb-2">
              Chat Name
            </label>
            <input
              type="text"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              className="placeholder-[#65686C] shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300"
              placeholder="Enter chat name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="font-['Montserrat'] text-[#2C2E30] block text-sm font-bold mb-2">
              Add Users
            </label>
            <div className="max-h-40 overflow-y-auto border rounded p-2">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => {
                      setSelectedUsers((prev) =>
                        prev.includes(user.id)
                          ? prev.filter((id) => id !== user.id)
                          : [...prev, user.id]
                      );
                    }}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`user-${user.id}`}
                    className="flex items-center cursor-pointer"
                  >
                    <Avatar color={user.color} text={user.avatar} size="sm" />
                    <span className="font-['Inter'] ml-2">{user.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-lg"
            >
              Create Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ChatRoom = () => {
  const [chats, setChats] = useState(CHATS_DATA);
  const [messages, setMessages] = useState(MESSAGES_DATA);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const messageContainerRef = useRef(null);

  // Get current chat data
  const currentChat =
    chats.find((chat) => chat.id === currentChatId) || chats[0];

  // Filter chats based on search and filter tab
  const getFilteredChats = () => {
    let filtered = [...chats];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tab filter
    if (activeFilter === "unread") {
      filtered = filtered.filter((chat) => chat.unread);
    }

    return filtered;
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      content: newMessage,
      fromUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Update last message in chat list
    const updatedChats = chats.map((chat) =>
      chat.id === currentChatId
        ? { ...chat, lastMessage: `You: ${newMessage}`, time: "now" }
        : chat
    );
    setChats(updatedChats);

    // Simulate response (in a real app, this would come from a backend)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content:
            "Thanks for your message! Our team will get back to you shortly.",
          fromUser: false,
          sender: currentChat.avatarText,
          senderColor: currentChat.avatarColor,
          timestamp: new Date(),
        },
      ]);
    }, 1500);
  };

  // Create a new chat
  const handleCreateChat = (chatData) => {
    const newChat = {
      id: chats.length + 1,
      name: chatData.name,
      avatarColor: `bg-${
        ["green", "blue", "purple", "cyan", "yellow"][
          Math.floor(Math.random() * 5)
        ]
      }-400`,
      avatarText: chatData.name.charAt(0).toUpperCase(),
      lastMessage: "Start a conversation...",
      time: "now",
      unread: false,
      info: `${chatData.members.length + 1} Members`,
    };

    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);

    // Reset messages for new chat
    setMessages([]);

    // On mobile, hide sidebar after selecting a chat
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle clicking on a chat
  const handleChatClick = (chatId) => {
    setCurrentChatId(chatId);

    // Mark as read
    setChats(
      chats.map((chat) =>
        chat.id === chatId && chat.unread ? { ...chat, unread: false } : chat
      )
    );

    // On mobile, hide sidebar after selecting a chat
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Check screen size on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowChatInfo(false);
        // Only show one panel at a time on mobile
        if (currentChatId && showSidebar) {
          setShowSidebar(false);
        }
      } else if (window.innerWidth < 1024) {
        setShowChatInfo(false);
        setShowSidebar(true);
      } else {
        setShowSidebar(true);
        setShowChatInfo(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentChatId]);

  // Toggle sidebars
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleChatInfo = () => setShowChatInfo(!showChatInfo);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - conditionally shown */}
        {showSidebar && (
          <Sidebar
            chats={getFilteredChats()}
            currentChatId={currentChatId}
            onChatClick={handleChatClick}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onNewChat={() => setIsNewChatModalOpen(true)}
          />
        )}

        {/* Chat Window with toggles for mobile */}
        <ChatWindow
          messages={messages}
          currentChat={currentChat}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSendMessage={handleSendMessage}
          messageContainerRef={messageContainerRef}
          toggleSidebar={toggleSidebar}
          toggleChatInfo={toggleChatInfo}
          showSidebar={showSidebar}
          showChatInfo={showChatInfo}
        />

        {/* Right Sidebar - conditionally shown */}
        {showChatInfo && currentChatId && <ChatInfo group={currentChat} />}
      </div>

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};

export default ChatRoom;
