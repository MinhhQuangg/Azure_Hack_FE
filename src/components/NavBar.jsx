import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, chatlas } from "../assets";
import menu from "../assets/menu_blue.svg";
import close from "../assets/close_blue.svg";
import { sections } from "../constants/index.js";
import { styles } from "../styles";

const NavBar = () => {
  const [active, setActive] = useState(
    window.location.pathname === "/" || window.location.pathname === "/Home"
      ? "Home"
      : window.location.pathname === "/Chat"
      ? "Chat"
      : window.location.pathname === "/Help"
      ? "Help"
      : ""
  );

  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const shadowStyle = { boxShadow: "0 2px 20px rgba(0, 0, 0, 0.25)" };
  const buttonShadow = { boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" };
  const linkFontSize = { fontSize: "1.25rem" };

  return (
    <nav
      className={`${styles.paddingX} bg-primary w-full z-10 fixed top-0 h-[4.5em] flex items-center`}
      style={shadowStyle}
    >
      <div className="w-full h-[100%] flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 sm:w-[30%]"
          onClick={() => {
            setActive("Home");
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer h-[45px]"
              onClick={() => navigate("/")}
            />
            <img
              src={chatlas}
              alt="Logo"
              className="cursor-pointer w-[114px] h-[27px]"
              onClick={() => navigate("/")}
            />
          </div>
        </Link>

        <ul className="list-none hidden sm:flex flex-row min-w-[30%] max-w-[35%] h-[100%] justify-center items-center font-['Montserrat']">
          {sections.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title && "bg-[#FFF48D]"
              } text-black w-[33%] h-[100%] hover:underline font-semibold cursor-pointer transition-all duration-100`}
              onClick={() => setActive(link.title)}
            >
              <a
                className="w-[100%] h-[100%] flex justify-center items-center"
                style={linkFontSize}
                href={`/${link.id}`}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden sm:flex w-[30%] justify-end items-center">
          <button
            type="submit"
            className="bg-[#E3E3E3] hover:bg-white py-1 px-5 rounded-full text-lg font-['Montserrat'] font-[500] text-[1.25rem]"
            style={{
              ...buttonShadow,
            }}
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>
        </div>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            onClick={() => setToggle(!toggle)}
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            alt="menu"
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-[#ECE17F] absolute top-14 right-0 my-2 min-w-[140px] z-10 rounded-xl`}
            style={buttonShadow}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4 font-['Montserrat'] font-semibold">
              {sections.map((link) => (
                <li
                  key={link.id}
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setToggle(false);
                    navigate(`/${link.id}`);
                  }}
                >
                  {link.title}
                </li>
              ))}
              <li
                className="cursor-pointer hover:underline"
                onClick={() => {
                  setToggle(false);
                  navigate("/signin");
                }}
              >
                Sign In
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
