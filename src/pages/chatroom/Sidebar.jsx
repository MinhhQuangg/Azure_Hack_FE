import Avatar from "./ReusableComponents.jsx";
import { TabButton } from "./ReusableComponents.jsx";
import { IconButton } from "./ReusableComponents.jsx";
import { styles } from "../../styles.js";
import { FaSearch, FaCommentDots } from "react-icons/fa";

const Sidebar = ({
  chats,
  currentChatId,
  onChatClick,
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  onNewChat,
}) => {
  return (
    <div className={`${styles.paddingY} w-64 border-r bg-white flex flex-col`}>
      {/* Sidebar Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Chats</h1>
        <IconButton icon={<FaCommentDots />} onClick={onNewChat} />
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="bg-gray-200 rounded-full p-2 flex items-center">
          <FaSearch className="text-gray-500 mx-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex px-4 gap-2 mb-2">
        <TabButton
          text="All"
          isActive={activeFilter === "all"}
          onClick={() => setActiveFilter("all")}
        />
        <TabButton
          text="Unread"
          isActive={activeFilter === "unread"}
          onClick={() => setActiveFilter("unread")}
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No chats found</div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`py-2 px-4 border-b hover:bg-gray-100 flex items-center cursor-pointer ${
                chat.id === currentChatId ? "bg-gray-100" : ""
              }`}
              onClick={() => onChatClick(chat.id)}
            >
              <Avatar color={chat.avatarColor} text={chat.avatarText} />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-gray-500 text-xs">{chat.time}</span>
                </div>
                <p className="text-gray-600 text-sm truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread && (
                <div className="bg-red-500 rounded-full h-2 w-2"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
