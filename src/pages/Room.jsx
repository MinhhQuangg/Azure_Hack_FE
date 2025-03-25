// ChatRoom.jsx
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/chatroom/Sidebar.jsx";
import ChatWindow from "../components/chatroom/ChatWindow.jsx";
import { CHATS_DATA, ALL_MESSAGES } from "../components/chatroom/Data.jsx";
import ChatInfo from "../components/chatroom/ChatInfo.jsx";
import NavBar from "../components/NavBar.jsx";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { showToastError } from "../components/common/ShowToast";
import RequestJoin from "../components/chatroom/RequestJoin.jsx";
import WaitingApproval from "../components/chatroom/WaitingApproval.jsx";
import { useParams, useNavigate } from "react-router-dom";

const ChatRoom = () => {
  // Empty state component displayed if no chat is selected
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
          <button
            className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded-full font-medium transition"
            onClick={() => setIsNewChatModalOpen(true)}
          >
            Start New Chat
          </button>
        </div>
      </div>
    );
  };

  // Modal component for creating a new chat (Chat Name + Description only)
  const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
    const [chatName, setChatName] = useState("");
    const [description, setDescription] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!chatName.trim()) return;

      // Create a new chat object locally
      onCreateChat({
        name: chatName,
        description: description,
      });

      setChatName("");
      setDescription("");
      onClose();
    };

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
            {/* Chat Name Field */}
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

            {/* Description Field (Replaces "Add Users") */}
            <div className="mb-4">
              <label className="font-['Montserrat'] text-[#2C2E30] block text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="placeholder-[#65686C] shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Enter a description (optional)"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="font-['Montserrat'] font-semibold bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-['Montserrat'] font-semibold bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-lg"
              >
                Create Chat
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const { chatId: urlChatId, inviteLink } = useParams();
  const navigate = useNavigate();
  //   const [chats, setChats] = useState(
  //     CHATS_DATA.map((chat) => ({
  //       ...chat,
  //       messages: ALL_MESSAGES[chat.id] || [],
  //       status: "active",
  //     }))
  //   );

  const userId = localStorage.getItem("user_id");
  // Start with empty arrays; no dummy data
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  // No chat selected initially => triggers EmptyState
  const [currentChatId, setCurrentChatId] = useState(null);
  // const currentChat = currentChatId
  //   ? chats.find((chat) => chat.id === currentChatId) || null
  //   : null;

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showJoinRequest, setShowJoinRequest] = useState(false);
  const [invitedChatDetails, setInvitedChatDetails] = useState({
    id: 999,
    name: "Invited Chat Room",
    avatarColor: "bg-blue-400",
    avatarText: "I",
    lastMessage: "You've been invited to this chat",
    time: "now",
    unread: false,
    messages: [],
    status: "invited",
  });

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredChats, setFilteredChats] = useState(chats);
  useEffect(() => {
    let filtered = [...chats];

    if (searchTerm) {
      filtered = filtered.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter === "unread") {
      filtered = filtered.filter((chat) => chat.unread);
    }

    setFilteredChats(filtered);
  }, [chats, activeFilter]);

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (inviteLink) {
      const mockInvitedChat = {
        id: 999,
        name: "Invited Chat Room",
        avatarColor: "bg-blue-400",
        avatarText: "I",
        lastMessage: "You've been invited to this chat",
        time: "now",
        unread: false,
        messages: [],
        status: "invited",
      };

      setInvitedChatDetails(mockInvitedChat);
      setShowJoinRequest(true);
    } else {
      setCurrentChatId(chats.length > 0 ? chats[0].id : null);
    }
  }, [inviteLink]);

  // Identify the current chat
  const currentChat = chats.find((chat) => chat.id === currentChatId) || null;

  // Load all most current chats to side bar

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const allChats = await axios.get(
          `http://localhost:3000/chatroom/user/${userId}`
        );
        const newChats =
          allChats.data?.chatRooms.map((chat) => chat.chatRoom) || [];

        const statuses = await Promise.all(
          newChats.map((chat) =>
            axios.get(
              `http://localhost:3000/chatroom/${chat.id}/readStatus/${userId}`
            )
          )
        );

        // Attach read status to chats
        newChats.forEach((chat, index) => {
          chat.unread = statuses[index].data.unread;
        });

        setChats([...chats, ...newChats]);
      } catch (err) {
        showToastError(err.response?.data?.message);
      }
    };
    fetchChats();
    setCurrentChatId(urlChatId);
  }, []);

  // Filter chats
  const getFilteredChats = () => {
    let filtered = [...chats];
    if (searchTerm) {
      filtered = filtered.filter(
        (chat) =>
          chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (chat.lastMessage &&
            chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (activeFilter === "unread") {
      filtered = filtered.filter((chat) => chat.unread);
    }
    return filtered;
  };

  // Send a new message locally
  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentChatId) return;

    const newMsg = {
      id: Date.now(),
      content: newMessage,
      fromUser: true,
      timestamp: new Date(),
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          messages: [...(chat.messages || []), newMsg],
          lastMessage: `You: ${newMessage}`,
          time: "now",
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage("");
    setIsTyping(true);
    const prevChats = updatedChats;
    setChats(
      prevChats.map((chat) => {
        if (chat.id === currentChatId) {
          const responseMsg = {
            id: Date.now(),
            content: `Response from ${chat.name}: Thanks for your message! We'll get back to you shortly.`,
            fromUser: false,
            sender: chat.avatarText,
            senderColor: chat.avatarColor,
            typing: true,
          };

          return {
            ...chat,
            messages: [...chat.messages, responseMsg],
          };
        }
        return chat;
      })
    );

    setTimeout(() => {
      setIsTyping(false);
      setChats(
        prevChats.map((chat) => {
          if (chat.id === currentChatId) {
            const responseMsg = {
              id: Date.now(),
              content: `Response from ${chat.name}: Thanks for your message! We'll get back to you shortly.`,
              fromUser: false,
              sender: chat.avatarText,
              senderColor: chat.avatarColor,
              typing: false,
              timestamp: new Date(),
            };

            return {
              ...chat,
              messages: [...chat.messages, responseMsg],
            };
          }
          return chat;
        })
      );
    }, 1500);
  };

  // Create a new chat locally
  const handleCreateChat = async (chatData) => {
    const data = {
      name: chatData.name,
      description: chatData.description || "",
      adminId: userId,
      avatarColor: `bg-${
        ["green", "purple", "cyan", "yellow", "blue"][
          Math.floor(Math.random() * 5)
        ]
      }-400`,
      avatarText: chatData.name.charAt(0).toUpperCase(),
      lastMessage: "Start a conversation...",
    };

    try {
      const response = await axios.post("http://localhost:3000/chatroom", data);
      if (response.status === 201) {
        const newChat = response.data?.chatroom;
        newChat.unread = true;
        setChats([newChat, ...chats]);
        setCurrentChatId(newChat.id);
      }
    } catch (err) {
      showToastError(err.response?.data?.message);
      console.log(err);
    }

    // Reset messages
    setMessages([]);

    // On mobile, hide sidebar after selecting a chat
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // Auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current && currentChat?.messages) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  // Handle selecting a chat
  const handleChatClick = async (chatId) => {
    setCurrentChatId(chatId);

    navigate(`/Chat/${chatId}`);

    setChats(
      chats.map((chat) =>
        chat.id === chatId && chat.unread ? { ...chat, unread: false } : chat
      )
    );

    await axios.put(
      `http://localhost:3000/chatroom/${chatId}/readStatus/${userId}`
    );

    // On mobile, hide sidebar after selecting
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleJoinRequest = (userName) => {
    console.log(
      `User ${userName} requested to join chat ${invitedChatDetails?.name}`
    );

    const newChat = {
      ...invitedChatDetails,
      id: Date.now(),
      status: "pending",
      messages: [
        {
          id: Date.now(),
          content: `You requested to join ${invitedChatDetails.name}. Waiting for approval...`,
          fromUser: false,
          sender: "System",
          senderColor: "bg-gray-400",
          timestamp: new Date(),
        },
      ],
    };

    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
    setShowJoinRequest(false);
  };

  const handleCancelJoinRequest = () => {
    setShowJoinRequest(false);

    if (chats.length > 0) {
      setCurrentChatId(urlChatId);
    } else {
      setCurrentChatId(null);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowChatInfo(false);
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

  // Toggles
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleChatInfo = () => setShowChatInfo(!showChatInfo);

  if (showJoinRequest && invitedChatDetails) {
    return (
      <div className="flex flex-col h-screen bg-gray-100">
        <NavBar />
        <div className="flex flex-1 overflow-hidden">
          {showSidebar && (
            <Sidebar
              chats={filteredChats}
              originalChats={chats}
              setOriginalChats={setChats}
              currentChatId={currentChatId}
              onChatClick={handleChatClick}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              onNewChat={() => setIsNewChatModalOpen(true)}
            />
          )}
          <RequestJoin
            chatName={invitedChatDetails.name}
            onJoinRequest={handleJoinRequest}
            onCancel={handleCancelJoinRequest}
          />
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    if (!currentChatId || !urlChatId) {
      return <EmptyState />;
    }

    if (currentChat?.status === "pending") {
      return <WaitingApproval chatName={currentChat.name} />;
    }

    return (
      <ChatWindow
        messages={currentChat?.messages || []}
        isTyping={isTyping}
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
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <Sidebar
            chats={filteredChats}
            originalChats={chats}
            setOriginalChats={setChats}
            currentChatId={currentChatId}
            onChatClick={handleChatClick}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onNewChat={() => setIsNewChatModalOpen(true)}
          />
        )}

        {renderMainContent()}

        {urlChatId &&
          showChatInfo &&
          currentChatId &&
          currentChat?.status !== "pending" && (
            <ChatInfo
              chatId={currentChatId}
              setCurrentChatId={setCurrentChatId}
              originalChats={chats}
              setOriginalChats={setChats}
            />
          )}
      </div>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};

export default ChatRoom;
