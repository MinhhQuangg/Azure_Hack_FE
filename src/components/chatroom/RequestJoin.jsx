import React, { useState } from "react";
import { FaUserPlus, FaTimes } from "react-icons/fa";

const RequestJoin = ({ chatName, onJoinRequest, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onJoinRequest();
    } catch (error) {
      console.error("Error sending join request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden">
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <h2 className="font-['Montserrat'] font-bold text-[1.35rem] flex items-center">
            <FaUserPlus className="mr-2 text-[#2C2E30]" />
            Join Chat Room
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-4 bg-gray-50">
          <div className="mb-6">
            <p className="font-['Inter'] text-black">
              You've been invited to join <strong>"{chatName}"</strong>. Your
              request will be reviewed by the group admin.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="font-['Montserrat'] font-semibold px-4 py-2 border border-[#D9D9D9] rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 text-[#2C2E30] bg-white disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="font-['Montserrat'] font-semibold px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black rounded focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Requesting..." : "Request to Join"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestJoin;
