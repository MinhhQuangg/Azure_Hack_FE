import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import NavBar from "../components/NavBar";

const Error = () => {
  return (
    <div className="flex flex-col h-[100vh] justify-center">
      <NavBar />
      <div className="w-full flex justify-center items-center">
        <div className="flex items-center w-[200px]">
          <img
            src={logo}
            alt="Logo"
            className="cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <p className=" lg:text-[4rem] text-[3rem] font-['Montserrat'] font-bold text-[#A30609]">
          404{" "}
          <span className="md:hidden">
            <br />
          </span>{" "}
          NOT FOUND
        </p>
        <p className="lg:text-[1.5rem] text-[1rem] text-[#A30609]">
          The page you requested does not exist{" "}
          <span className="md:hidden">
            <br />
          </span>{" "}
          or has been removed! <br />
          <div className="md:hidden mt-3" />
          Please try another link.
        </p>
      </div>
    </div>
  );
};

export default Error;
