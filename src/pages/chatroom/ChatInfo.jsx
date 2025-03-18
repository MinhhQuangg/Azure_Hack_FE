import React, { useState } from "react";
import { styles } from "../../styles";
import { IconButton } from "./ReusableComponents";
import {
  FaGlobe,
  FaEdit,
  FaEllipsisH,
  FaCopy,
  FaTimesCircle,
} from "react-icons/fa";

const ChatInfo = ({ group }) => {
  const [language, setLanguage] = useState("English");

  return (
    <div
      className={`${styles.paddingY} mt-10 lg:mt-2 md:mt-5 flex flex-col w-64 border-l border-gray-200 bg-white`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-2xl font-bold">Group 1</h2>
        <button className="text-gray-500">
          <FaEdit size={16} />
        </button>
      </div>

      <div className="flex md:hidden items-center">
        <IconButton icon={<FaGlobe />} />
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

      <div className="p-4 border-b">
        <h3 className="text-gray-600 mb-1">Created</h3>
        <p className="text-sm">March 3, 2025</p>
      </div>

      <div className="p-4 border-b">
        <h3 className="text-gray-600 mb-2">Members</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-400 flex-shrink-0"></div>
            <span className="ml-2">Person 1</span>
          </div>
          <button className="text-gray-500">
            <FaEllipsisH size={16} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
              U
            </div>
            <span className="ml-2">User123</span>
          </div>
          <span className="text-xs text-gray-500">Admin</span>
        </div>
      </div>

      <div className="p-4 border-b">
        <h3 className="text-gray-600 mb-2">Requests</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-200 flex-shrink-0"></div>
            <span className="ml-2">Person 2</span>
          </div>
          <button className="text-gray-500">
            <FaEllipsisH size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 border-b">
        <h3 className="text-gray-600 mb-2">Invite Link</h3>
        <div className="flex items-center">
          <p className="text-xs text-gray-500 truncate mr-2">
            chatlas/supercoolplaceholderlink/id.com
          </p>
          <button className="text-gray-500">
            <FaCopy size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 mt-auto">
        <button className="flex items-center text-red-500 font-medium">
          <FaTimesCircle size={16} className="mr-1" />
          Leave Group
        </button>
      </div>
    </div>
  );
};

export default ChatInfo;
