import { chatlas, logo } from "../assets";
import { styles } from "../styles";

export const Footer = () => {
  return (
    <div
      className={`${styles.paddingX} bg-secondary w-full py-3 z-10 bottom-0`}
    >
      <div className="w-full flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer w-[53px] h-[50px]"
            />
            <img
              src={chatlas}
              alt="Logo"
              className="cursor-pointer w-[114px] h-[27px]"
            />
          </div>
        </div>
        <p className="text-[18px] font-bold cursor-pointer flex"></p>
      </div>
      <div className={` ${styles.sectionHeadText} flex justify-between `}>
        <div>chatlasplaceholder@gmail.com</div>
        <div>© 2025 Chatlas. All Rights Reserved</div>
      </div>
    </div>
  );
};
export default Footer;
