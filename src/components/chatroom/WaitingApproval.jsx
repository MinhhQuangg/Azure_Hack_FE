import React from "react";
import { FaHourglassHalf } from "react-icons/fa";

const WaitingApproval = ({ chatName }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 mt-20">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 border border-[5px] border-[#ECE17F] rounded-full flex items-center justify-center">
            <FaHourglassHalf size={32} className="text-[#EEBF2D]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2 font-['Montserrat']">
          Waiting for Approval
        </h2>
        <p className="text-gray-900 mb-6 font-['Inter']">
          Your request to join <strong>"{chatName}"</strong> has been submitted.
          You'll be able to view messages once an admin approves your request.
        </p>
        <div className="flex justify-center">
          <div className="flex space-x-2 mt-4">
            <div
              className="h-3 w-3 bg-[#EEBF2D] rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-3 w-3 bg-[#EEBF2D] rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="h-3 w-3 bg-[#EEBF2D] rounded-full animate-bounce"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingApproval;
