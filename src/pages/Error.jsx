import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col h-[100vh] justify-center">
      <div className="flex flex-col items-center justify-center">
        <p className="text-[84px]">
          404 <span className="text-red-600">Error</span>
        </p>
        <p className="text-[40px]">This page does not exist</p>
        <p className="text-[25px] mt-[19px]">
          Please return to{" "}
          <Link to="/" className="text-red-600 underline">
            Homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
