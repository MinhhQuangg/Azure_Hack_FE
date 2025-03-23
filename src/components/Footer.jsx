import { styles } from "../styles";
import { FaRegEnvelope } from "react-icons/fa";

export const Footer = () => {
  return (
    <div
      className={`${styles.paddingX} bg-secondary w-full py-5 z-10 bottom-0`}
    >
      <div
        className={`mt-2 font-["Inter"] text-[1.25rem] flex flex-col md:flex-row justify-between`}
      >
        <div className="underline flex items-center gap-2">
          <FaRegEnvelope size={16} />
          chatlashelp@gmail.com
        </div>
        <div>© 2025 Chatlas. All Rights Reserved</div>
      </div>
    </div>
  );
};
export default Footer;
