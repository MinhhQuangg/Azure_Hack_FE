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

const LeaveGroupNotification = ({ isOpen, onClose }) => {
  if (!isOpen) return;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg py-8 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
        >
          &times;
        </button>
        <h2 className="font-['Montserrat'] w-full text-center text-xl font-bold mb-5">
          Leave Group?
        </h2>
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          <button className="font-bold font-['Montserrat'] w-[50%] text-black rounded-md py-2 bg-yellow-400 hover:bg-yellow-300">
            Yes
          </button>
          <button
            className="font-bold font-['Montserrat'] w-[50%] bg-[#E8E8E8] hover:bg-gray-300 text-[#A30609] rounded-md py-2"
            style={{ border: "1px solid rgba(0,0,0,0.3)" }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const UserInfo = ({ isOpen, onClose }) => {
  if (!isOpen) return;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg py-8 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
        >
          &times;
        </button>
        <h2 className="font-['Montserrat'] w-full text-center text-xl font-bold mb-5">
          User Info
        </h2>
        <div className="text-center">
          <div>Joined</div>
          <p>March 3, 2025</p>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          <button className="font-bold font-['Montserrat'] w-[50%] text-black rounded-md py-2 bg-yellow-400 hover:bg-yellow-300">
            Make Admin
          </button>
          <button
            className="font-bold font-['Montserrat'] w-[50%] bg-[#E8E8E8] hover:bg-gray-300 text-[#A30609] rounded-md py-2"
            style={{ border: "1px solid rgba(0,0,0,0.3)" }}
          >
            Remove Member
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatInfo = ({ group }) => {
  const [language, setLanguage] = useState("English");
  const [isOpenLeaveGroupNotification, setIsOpenLeaveGroupNotification] =
    useState(false);
  const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);

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
          <button
            className="text-gray-500"
            onClick={() => setIsOpenUserInfo(true)}
          >
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

      <div className="p-4 mt-auto flex items-center justify-center">
        <button
          className="flex items-center text-red-500 font-medium"
          onClick={() => setIsOpenLeaveGroupNotification(true)}
        >
          <FaTimesCircle size={16} className="mr-1" />
          Leave Group
        </button>
      </div>

      <LeaveGroupNotification
        isOpen={isOpenLeaveGroupNotification}
        onClose={() => setIsOpenLeaveGroupNotification(false)}
      />

      <UserInfo
        isOpen={isOpenUserInfo}
        onClose={() => setIsOpenUserInfo(false)}
      />
    </div>
  );
};

export default ChatInfo;
