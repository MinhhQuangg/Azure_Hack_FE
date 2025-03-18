import React, { useState, useEffect } from "react";
import { styles } from "../../styles";
import Avatar, { IconButton } from "./ReusableComponents";
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
import {
  showToastError,
  showToastSuccess,
} from "../../components/common/ShowToast";

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
  const { id, name, isOnline, isAdmin: memberIsAdmin, avatarColor } = member;

  const isCurrentUser = id === currentUserId;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <Avatar
          color={avatarColor}
          text={name.charAt(0).toUpperCase()}
          size="sm"
        />
        <span className="font-['Inter'] ml-2">
          {name}
          {isCurrentUser ? " (You)" : ""}
        </span>
      </div>
      {isCurrentUser ? (
        <span className="font-['Inter'] text-xs text-gray-500">
          {memberIsAdmin ? "Admin" : ""}
        </span>
      ) : (
        <>
          {memberIsAdmin ? (
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

const ChatInfo = ({ groupId }) => {
  const [language, setLanguage] = useState("English");
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [groupData, setGroupData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joinRequests, setJoinRequests] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("user-123");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        setLoading(true);
        setTimeout(() => {
          const mockData = {
            id: groupId || "group-1",
            name: "Group 1",
            createdAt: "2025-03-03T12:00:00Z",
            inviteLink: "chatlas/supercoolplaceholderlink/id.com",
            members: [
              {
                id: "user-123",
                name: "User123",
                isAdmin: true,
                isOnline: true,
                avatarColor: "bg-[#25A59F]",
                joined: "3-3-2025",
              },
              {
                id: "person-1",
                name: "Person 1",
                isAdmin: false,
                isOnline: true,
                avatarColor: "bg-[#A4F2FA]",
                joined: "3-5-2025",
              },
            ],
            joinRequests: [
              {
                id: "person-2",
                name: "Person 2",
                requestedAt: "2025-03-15T09:45:00Z",
                avatarColor: "bg-[#93c5fd]",
                joined: "",
              },
            ],
          };

          setGroupData(mockData);
          setNewGroupName(mockData.name);
          setJoinRequests(mockData.joinRequests);
          setLoading(false);
        }, 300);
      } catch (err) {
        setError("Failed to load group data");
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const isCurrentUserAdmin = groupData?.members.some(
    (member) => member.id === currentUserId && member.isAdmin
  );

  const handleLeaveGroup = async () => {
    try {
      console.log("Left group", groupId);
      showToastSuccess(`Left group successfully`);
      setIsLeaveModalOpen(false);
    } catch (err) {
      console.error("Failed to leave group", err);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      if (action === "makeAdmin") {
        // await api.makeUserAdmin(groupId, userId);
        console.log("Made user admin", userId);
      } else if (action === "removeAdmin") {
        // await api.removeUserAdmin(groupId, userId);
        console.log("Removed admin status from user", userId);
      } else if (action === "removeMember") {
        // await api.removeMember(groupId, userId);
        console.log("Removed member", userId);
      }
      setIsUserInfoModalOpen(false);

      if (action === "makeAdmin") {
        setGroupData((prev) => ({
          ...prev,
          members: prev.members.map((member) =>
            member.id === userId ? { ...member, isAdmin: true } : member
          ),
        }));
      } else if (action === "removeAdmin") {
        setGroupData((prev) => ({
          ...prev,
          members: prev.members.map((member) =>
            member.id === userId ? { ...member, isAdmin: false } : member
          ),
        }));
      } else if (action === "removeMember") {
        setGroupData((prev) => ({
          ...prev,
          members: prev.members.filter((member) => member.id !== userId),
        }));
      }
    } catch (err) {
      console.error(`Failed to ${action}`, err);
    }
  };

  const handleJoinRequest = async (requestId, accept) => {
    try {
      console.log(accept ? "Accepted" : "Rejected", "join request", requestId);

      setJoinRequests((prev) => prev.filter((req) => req.id !== requestId));

      if (accept) {
        const newMember = joinRequests.find((req) => req.id === requestId);
        setGroupData((prev) => ({
          ...prev,
          members: [
            ...prev.members,
            { ...newMember, joined: new Date(), isAdmin: false },
          ],
        }));
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

      console.log("Updated group name to", newGroupName);

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
        className={`${styles.paddingY} mt-10 lg:mt-2 md:mt-5 flex flex-col w-64 border-l border-gray-200 bg-white items-center justify-center`}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${styles.paddingY} mt-10 lg:mt-2 md:mt-5 flex flex-col w-64 border-l border-gray-200 bg-white items-center justify-center`}
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
      className={`${styles.paddingY} mt-10 lg:mt-2 md:mt-5 flex flex-col w-64 border-l border-gray-200 bg-white`}
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
            isAdmin={isCurrentUserAdmin}
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
                <Avatar
                  color={request.avatarColor}
                  text={request.name.charAt(0).toUpperCase()}
                  size="sm"
                />
                <span className="font-['Inter'] ml-2">{request.name}</span>
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
          className="flex items-center text-red-500 font-medium"
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
          <p className="text-gray-600">{formatDate(selectedUser?.joined)}</p>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center w-full">
          {selectedUser?.isAdmin ? (
            <ActionButton
              onClick={() => handleUserAction(selectedUser?.id, "removeAdmin")}
              primary
            >
              <div className="flex items-center justify-center">
                <FaUserShield className="mr-2" />
                Remove Admin Status
              </div>
            </ActionButton>
          ) : (
            <ActionButton
              onClick={() => handleUserAction(selectedUser?.id, "makeAdmin")}
              primary
            >
              <div className="flex items-center justify-center">
                <FaUserShield className="mr-2" />
                Make Admin
              </div>
            </ActionButton>
          )}
          <ActionButton
            onClick={() => handleUserAction(selectedUser?.id, "removeMember")}
          >
            <div className="flex items-center justify-center">
              <FaTimesCircle className="mr-2" />
              Remove Member
            </div>
          </ActionButton>
        </div>
      </Modal>
    </div>
  );
};

export default ChatInfo;
