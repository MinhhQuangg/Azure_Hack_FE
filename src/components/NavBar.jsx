import { styles } from "../styles";
import { sections } from "../constants/index.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { menu, close, logo, chatlas } from "../assets";

export const NavBar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.paddingX} bg-primary w-full py-3 z-10 fixed top-0`}
    >
      <div className="w-full flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div>
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo"
                className="cursor-pointer w-[53px] h-[50px]"
                onClick={() => navigate("/")}
              />
              <img
                src={chatlas}
                alt="Logo"
                className="cursor-pointer w-[114px] h-[27px]"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
          <p className="text-white text-[18px] font-bold cursor-pointer flex"></p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-20">
          {sections.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-black"
              } ${
                styles.headerSignInSubText
              } hover:text-white font-bold cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
        <div className="hidden sm:flex gap-4">
          <button
            type="submit"
            className={`bg-[#E3E3E3] hover:bg-white font-bold py-2 px-3 rounded-full text-lg`}
            onClick={() => navigate("/signin")}
          >
            Sign In
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
            } p-6 bg-primary absolute top-14 right-0  my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {sections.map((link) => (
                <li
                  key={link.id}
                  className={` hover:text-white font-poppins font-medium cursor-pointer text-[16px]
              }`}
                  onClick={() => navigate(`/${link.id}`)}
                >
                  {link.title}
                </li>
              ))}
              <li
                className={`hover:text-white font-poppins font-medium cursor-pointer text-[16px]
              }`}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
