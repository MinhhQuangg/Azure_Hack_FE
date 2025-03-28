import React, { useState, useEffect } from "react";
import { styles } from "../../styles";
import { AvatarChat, AvatarPerson, IconButton } from "./ReusableComponents";
import {
  FaGlobe,
  FaEdit,
  FaEllipsisH,
  FaCopy,
  FaTimesCircle,
  FaCheck,
  FaTimes,
  FaUserPlus,
  FaUserShield,
  FaSave,
} from "react-icons/fa";
import { showToastError, showToastSuccess } from "../common/ShowToast";
import axios from "axios";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 shadow-lg py-8 relative">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
        >
          <FaTimes />
        </button>
        <h2 className="font-['Montserrat'] w-full text-center text-xl font-bold mb-5">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

const ActionButton = ({ onClick, primary, children, className }) => (
  <button
    onClick={onClick}
    className={`font-bold font-['Montserrat'] w-[50%] rounded-md py-2 ${
      primary
        ? "text-black bg-yellow-400 hover:bg-yellow-300"
        : "bg-[#E8E8E8] hover:bg-gray-300 text-[#A30609]"
    } ${className || ""}`}
    style={primary ? {} : { border: "1px solid rgba(0,0,0,0.3)" }}
  >
    {children}
  </button>
);

const MemberItem = ({ member, currentUserId, isAdmin, onUserInfoClick }) => {
  const { id, given_name, profile_picture } = member;

  const isCurrentUser = id === currentUserId;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <AvatarPerson
          person={member}
          // text={given_name.charAt(0).toUpperCase()}
          size="sm"
          // url={profile_picture}
        />
        <span className="font-['Inter'] ml-2">
          {given_name}
          {isCurrentUser ? " (You)" : ""}
        </span>
      </div>
      {isCurrentUser ? (
        <span className="font-['Inter'] text-xs text-gray-500">
          {isAdmin ? "Admin" : ""}
        </span>
      ) : (
        <>
          {isAdmin ? (
            <div className="flex items-center">
              <span className="font-['Inter'] text-xs text-gray-500 mr-2">
                Admin
              </span>
              <button
                className="text-gray-500"
                onClick={() => onUserInfoClick(member)}
              >
                <FaEllipsisH size={16} />
              </button>
            </div>
          ) : (
            <button
              className="text-gray-500"
              onClick={() => onUserInfoClick(member)}
            >
              <FaEllipsisH size={16} />
            </button>
          )}
        </>
      )}
    </div>
  );
};

const ChatInfo = ({
  chatId,
  setCurrentChatId,
  originalChats,
  setOriginalChats,
}) => {
  const userId = localStorage.getItem("user_id");
  const [language, setLanguage] = useState("English");
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(userId);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        // fetch chat room info
        const response = await axios.get(
          `http://localhost:3000/chatroom/${chatId}`
        );
        const chatRoom = response.data.chatRoom;

        // get member and pending members list
        const members = [];
        const pendingMembers = [];

        for (const member of chatRoom.members) {
          if (member.status == "approved") {
            members.push(member);
          } else if (member.status == "pending") {
            pendingMembers.push(member);
          }
        }

        setLoading(true);
        setTimeout(async () => {
          const mockData = {
            id: chatRoom.id,
            name: chatRoom.name,
            createdAt: chatRoom.created_at,
            description: chatRoom.description,
            adminId: chatRoom.admin_id,
            inviteLink: `localhost:5173/Chat/${chatRoom.id}`,
            members: members,
            joinRequests: pendingMembers,
          };

          setGroupData(mockData);
          setNewGroupName(mockData.name);
          setJoinRequests(mockData.joinRequests);
          setLoading(false);
        }, 300);
      } catch (err) {
        setError("Failed to load group data: ", err.message);
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [chatId]);

  axios
    .get(`http://localhost:3000/chatroom/${chatId}/admin/${userId}`)
    .then((response) => {
      const isAdmin = response.data?.isAdmin;
      setIsCurrentUserAdmin(isAdmin);
    });

  const handleLeaveGroup = async () => {
    try {
      console.log("Left group", chatId);

      await axios.delete(
        `http://localhost:3000/chatroom/${chatId}/leave/${userId}`
      );

      showToastSuccess(`Left group successfully`);
      const remainingChats = originalChats.filter((chat) => chat.id !== chatId);
      console.log(chatId, remainingChats);

      setOriginalChats(remainingChats);
      setCurrentChatId(remainingChats[0].id);
      setIsLeaveModalOpen(false);
    } catch (err) {
      console.error("Failed to leave group", err);

      const remainingChats = originalChats.filter((chat) => chat.id !== chatId);
      setOriginalChats(remainingChats);
      setCurrentChatId(remainingChats[0].id);
      setIsLeaveModalOpen(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      setIsUserInfoModalOpen(false);

      if (action === "makeAdmin") {
        await axios.put(
          `http://localhost:3000/chatroom/${chatId}/changeAdmin`,
          {
            newAdminId: userId,
          }
        );
        setGroupData((prev) => ({
          ...prev,
          members: prev.members.map((member) =>
            member.id === userId ? { ...member, isAdmin: true } : member
          ),
          adminId: userId,
        }));

        setIsCurrentUserAdmin(false);
      } else if (action === "removeMember") {
        await axios.delete(
          `http://localhost:3000/chatroom/${chatId}/members/${userId}`
        );
        setGroupData((prev) => ({
          ...prev,
          members: prev.members.filter((member) => member.id !== userId),
        }));
      }
    } catch (err) {
      console.error(`Failed to ${action}`, err);
    }
  };

  const handleJoinRequest = async (userId, accept) => {
    try {
      setJoinRequests((prev) => prev.filter((req) => req.id !== userId));

      if (accept) {
        const newMember = joinRequests.find((req) => req.id === userId);
        setGroupData((prev) => ({
          ...prev,
          members: [
            ...prev.members,
            { ...newMember, joined: new Date(), isAdmin: false },
          ],
        }));

        // send backend accept request
        await axios.put(
          `http://localhost:3000/chatroom/${chatId}/memberRequest`,
          {
            userId: userId,
            status: "approved",
          }
        );
      } else {
        await axios.put(
          `http://localhost:3000/chatroom/${chatId}/memberRequest`,
          {
            userId: userId,
            status: "rejected",
          }
        );
      }
    } catch (err) {
      console.error("Failed to handle join request", err);
    }
  };

  const handleCopyInviteLink = () => {
    if (groupData?.inviteLink) {
      navigator.clipboard
        .writeText(groupData.inviteLink)
        .then(() => {
          showToastSuccess("Copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy", err);
        });
    }
  };

  const handleUserInfoClick = (user) => {
    setSelectedUser(user);
    setIsUserInfoModalOpen(true);
  };

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    try {
      if (!newGroupName.trim()) {
        showToastError("Group name cannot be empty");
        return;
      }

      if (newGroupName.trim() === groupData.name) {
        setIsEditingName(false);
        return;
      }

      // update backend
      await axios.put(`http://localhost:3000/chatroom/${chatId}`, {
        name: newGroupName,
      });

      setGroupData((prev) => ({
        ...prev,
        name: newGroupName.trim(),
      }));

      setIsEditingName(false);

      showToastSuccess("Group name updated successfully");
    } catch (err) {
      console.error("Failed to update group name", err);
      showToastError("Failed to update group name");
    }
  };

  const handleCancelNameEdit = () => {
    setNewGroupName(groupData.name);
    setIsEditingName(false);
  };

  if (loading) {
    return (
      <div
        className={`xl:pt-18 lg:pt-16 md:pt-12 sm:pt-8 pt-6 mt-10 lg:mt-2 md:mt-5 flex flex-col w-80 border-l border-gray-200 bg-white items-center justify-center`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`xl:pt-18 lg:pt-16 md:pt-12 sm:pt-8 pt-6 mt-10 lg:mt-2 md:mt-5 flex flex-col w-80 border-l border-gray-200 bg-white items-center justify-center`}
      >
        <p className="text-red-500">{error}</p>
        <button
          className="mt-2 text-blue-500"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className={`xl:pt-18 lg:pt-16 md:pt-12 sm:pt-8 pt-6 mt-10 lg:mt-2 md:mt-5 flex flex-col w-80 border-l border-gray-200 bg-white overflow-auto`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isEditingName ? (
          <div className="flex items-center w-full">
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="font-['Montserrat'] text-lg font-bold w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
              autoFocus
              maxLength={50}
            />
            <div className="flex ml-2">
              <button
                className="text-green-500 mr-1"
                onClick={handleSaveName}
                title="Save"
              >
                <FaCheck size={16} />
              </button>
              <button
                className="text-red-500"
                onClick={handleCancelNameEdit}
                title="Cancel"
              >
                <FaTimes size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-['Montserrat'] text-2xl font-bold">
              {groupData?.name}
            </h2>
            {isCurrentUserAdmin && (
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleEditNameClick}
                title="Edit group name"
              >
                <FaEdit size={16} />
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex md:hidden items-center p-4">
        <IconButton icon={<FaGlobe />} />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="font-['Inter'] w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>

      <div className="p-4 border-b">
        <h3 className="font-['Montserrat'] font-bold mb-1">Created</h3>
        <p className="font-['Inter'] text-sm">
          {formatDate(groupData?.createdAt)}
        </p>
      </div>

      <div className="p-4 border-b">
        <h3 className="font-['Montserrat'] font-bold mb-2">
          Members ({groupData?.members.length})
        </h3>
        {groupData?.members.map((member) => (
          <MemberItem
            key={member.id}
            member={member}
            currentUserId={currentUserId}
            isAdmin={member.id == groupData.adminId}
            onUserInfoClick={handleUserInfoClick}
          />
        ))}
      </div>

      {isCurrentUserAdmin && joinRequests.length > 0 && (
        <div className="p-4 border-b">
          <h3 className="font-['Montserrat'] font-bold mb-2">
            Requests ({joinRequests.length})
          </h3>
          {joinRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between mb-2"
            >
              <div className="flex items-center">
                <AvatarPerson
                  person={request}
                  // text={request.given_name.charAt(0).toUpperCase()}
                  size="sm"
                  // url={request.profile_picture}
                />
                <span className="font-['Inter'] ml-2">
                  {request.given_name}
                </span>
              </div>
              <div className="flex">
                <button
                  className="text-green-500 mr-2"
                  onClick={() => handleJoinRequest(request.id, true)}
                >
                  <FaCheck size={16} />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleJoinRequest(request.id, false)}
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 border-b">
        <h3 className="font-['Montserrat'] font-bold mb-2">Invite Link</h3>
        <div className="flex items-center">
          <p className="text-xs truncate mr-2">{groupData?.inviteLink}</p>
          <button className="text-[#65686C]" onClick={handleCopyInviteLink}>
            <FaCopy size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 mt-auto flex items-center justify-center">
        <button
          className="font-['Montserrat'] font-semibold flex items-center text-red-500 font-medium"
          onClick={() => setIsLeaveModalOpen(true)}
        >
          <FaTimesCircle size={16} className="mr-1" />
          Leave Group
        </button>
      </div>

      <Modal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        title="Leave Group?"
      >
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          <ActionButton onClick={handleLeaveGroup} primary>
            Yes
          </ActionButton>
          <ActionButton onClick={() => setIsLeaveModalOpen(false)}>
            No
          </ActionButton>
        </div>
      </Modal>

      <Modal
        isOpen={isUserInfoModalOpen}
        onClose={() => setIsUserInfoModalOpen(false)}
        title="User Info"
      >
        <div className="text-center mb-6">
          <div className="font-medium text-gray-700">Joined</div>
          <p className="text-gray-600">{formatDate(selectedUser?.timestamp)}</p>
          <p className="text-gray-600">{selectedUser?.email}</p>
        </div>
        {isCurrentUserAdmin && (
          <div className="flex flex-col gap-5 items-center justify-center w-full">
            {/* <ActionButton
            onClick={() => handleUserAction(selectedUser?.id, "removeAdmin")}
            primary
          >
            <div className="flex items-center justify-center">
              <FaUserShield className="mr-2" />
              Remove Admin Status
            </div>
          </ActionButton> */}
            <ActionButton
              onClick={() => handleUserAction(selectedUser?.id, "makeAdmin")}
              primary
            >
              <div className="flex items-center justify-center">
                <FaUserShield className="mr-2" />
                Make Admin
              </div>
            </ActionButton>
            <ActionButton
              onClick={() => handleUserAction(selectedUser?.id, "removeMember")}
            >
              <div className="flex items-center justify-center">
                <FaTimesCircle className="mr-2" />
                Remove Member
              </div>
            </ActionButton>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ChatInfo;
