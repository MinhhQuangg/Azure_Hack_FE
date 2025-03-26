// Room.jsx
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/chatroom/Sidebar.jsx";
import ChatWindow from "../components/chatroom/ChatWindow.jsx";
import ChatInfo from "../components/chatroom/ChatInfo.jsx";
import NavBar from "../components/NavBar.jsx";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import io from "socket.io-client";
import { showToastError } from "../components/common/ShowToast";

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

const NewChatModal = ({ isOpen, onClose, onCreateChat }) => {
  const [chatName, setChatName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!chatName.trim()) return;

    onCreateChat({
      name: chatName,
      description: description,
    });

    setChatName("");
    setDescription("");
    onClose();
  };

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

const ChatRoom = () => {
  const userId = localStorage.getItem("user_id");

  // Instead of a single [messages], we store a dictionary: { [roomId]: [msg, msg, ...], ... }
  const [roomMessages, setRoomMessages] = useState({});
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  // UI states
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChatInfo, setShowChatInfo] = useState(false);

  const [messagePagination, setMessagePagination] = useState({}); // { [chatId]: { cursor, hasMore } }

  const messageContainerRef = useRef(null);

  // Single socket
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      transports: ["websocket"],
      auth: { userId: userId },
    });
    setSocket(socketInstance);

    return () => socketInstance.disconnect();
  }, [userId]);

  useEffect(() => {
    if (!socket || !currentChatId) return;
    const handleReceiveMessage = (incomingMessage) => {
      console.log("Received via socket:", incomingMessage);
      setRoomMessages((prev) => {
        const existing = prev[currentChatId] || [];
        return { ...prev, [currentChatId]: [...existing, { ...incomingMessage, fromUser: false}] };
      });
    };
    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, currentChatId]);
  
  // For the currently selected chat, we show that chat's messages or an empty array
  const currentChatMessages = roomMessages[currentChatId] || [];
  const currentChat = chats.find((c) => c.id === currentChatId) || null;

  // 1. Load all chats for the sidebar (no GET for messages, just for chats)
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const allChats = await axios.get(
          `http://localhost:3000/chatroom/user/${userId}`
        );
        const newChats =
          allChats.data?.chatRooms.map((chat) => chat.chatRoom) || [];

          console.log("Chats from server:", newChats);
        // Mark unread
        const statuses = await Promise.all(
          newChats.map((chat) =>
            axios.get(
              `http://localhost:3000/chatroom/${chat.id}/readStatus/${userId}`
            )
          )
        );

        newChats.forEach((chat, index) => {
          chat.unread = statuses[index].data.unread;
        });

        setChats([...chats, ...newChats]);
      } catch (err) {
        showToastError(err.response?.data?.message);
      }
    };

    fetchChats();
  }, [userId]);

  // 2. Filter chats for sidebar
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

// 4. Send message => POST to the server, but also emit via socket
const handleSendMessage = async () => {
  //console.log("handleSendMessage was called, currentChatId=", currentChatId);
  if (!newMessage.trim() || !currentChatId) return;

  try {
    const response = await axios.post(
      `http://localhost:3000/rooms/${currentChatId}/messages`,
      { text: newMessage, userId: userId }
    );
    console.log(response.status, response.data);

    const savedMessage = response.data;
    savedMessage.fromUser = true;
    savedMessage.timestamp = new Date();

    setRoomMessages((prev) => {
      const existingArray = prev[currentChatId] || [];
      return {
        ...prev,
        [currentChatId]: [...existingArray, savedMessage],
      };
    });

    const messageToSend = {
      content: savedMessage.content,
      sender: userId || "Unknown",
      senderColor: savedMessage.senderColor || "#ccc",
      timestamp: new Date(),
    };
    
    if (!socket) {
      console.log("No socket reference, cannot emit!");
    } else {
      socket.emit("send-message", messageToSend, currentChatId);
    }

    setNewMessage("");

    const updated = chats.map((chat) =>
      chat.id === currentChatId
        ? { ...chat, lastMessage: `You: ${newMessage}`, time: "now" }
        : chat
    );
    setChats(updated);
  } catch (error) {
    console.error(error);
    showToastError(error.response?.data?.error || "Error sending message");
  }
};


  // 5. Create a new chat => POST to the server (no GET for messages)
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
        setChats((prev) => [newChat, ...prev]);
        setCurrentChatId(newChat.id);

        // Optionally join the new room
        if (socket) {
          socket.emit("joinRoom", newChat.id);
        }

        // Start with an empty array for the new chat
        setRoomMessages((prev) => ({
          ...prev,
          [newChat.id]: [],
        }));
      }
    } catch (err) {
      showToastError(err.response?.data?.message);
      console.log(err);
    }

    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  // 6. Auto-scroll
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
messageContainerRef.current.scrollHeight;
    }
  }, [currentChatMessages]);

  // 7. Handle selecting a chat
  const handleChatClick = async (chatId) => {
    setCurrentChatId(chatId);
    // Mark as read
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId && chat.unread ? { ...chat, unread: false } : chat
      )
    );

    // Join the room if using Socket for presence
    if (socket) {
      socket.emit("joinRoom", chatId);
    }

    // On mobile, hide sidebar
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }

    // Fetch initial messages (if not already loaded)
    if (!roomMessages[chatId]) {
      try {
        const res = await axios.get(`http://localhost:3000/chatroom/${chatId}/messages`, {
          params: {
            cursor: null
          }
        });        

        setRoomMessages((prev) => ({
          ...prev,
          [chatId]: res.data.messages,
        }));

        // setRoomMessages((prev) => {
        //   const existing = prev[chatId] || [];
        //   return {
        //     ...prev,
        //     [chatId]: [...newMessages, ...existing], // prepend
        //   };
        // });

        setMessagePagination((prev) => ({
          ...prev,
          [chatId]: {
            cursor: res.data.cursor,
            hasMore: res.data.hasMore,
          },
        }));
        
      } catch (err) {
        console.error("Error loading initial messages:", err);
        showToastError("Failed to load messages");
      }
      console.log(11111)
    }
  };

  // 8. Handle resizing
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

  // 9. Toggles
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleChatInfo = () => setShowChatInfo(!showChatInfo);

  // 10. Lazy loading for messages
  const loadMoreMessages = async (chatId) => {
    const { cursor, hasMore } = messagePagination[chatId] || {};
    if (hasMore === false) return;

    try {
      const res = await axios.get(`http://localhost:3000/chatroom/${chatId}/messages`, {
        params: { cursor }
      });

      const newMessages = res.data.messages;

      setRoomMessages((prev) => {
        const current = prev[chatId] || [];
        return {
          ...prev,
          [chatId]: [...newMessages, ...current]
        };
      });

      setMessagePagination((prev) => ({
        ...prev,
        [chatId]: {
          cursor: res.data.cursor,
          hasMore: res.data.hasMore
        }
      }));
    } catch (err) {
      console.error("Failed to load older messages:", err);
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavBar />

      <div className="flex flex-1 overflow-hidden">
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

        {currentChatId ? (
          <ChatWindow
            messages={currentChatMessages}
            currentChat={currentChat}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={handleSendMessage}
            messageContainerRef={messageContainerRef}
            toggleSidebar={toggleSidebar}
            toggleChatInfo={toggleChatInfo}
            showSidebar={showSidebar}
            showChatInfo={showChatInfo}
            onLoadMoreMessages={loadMoreMessages}
          />
        ) : (
          <EmptyState />
        )}

        {showChatInfo && currentChatId && <ChatInfo chatId={currentChatId} />}
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
