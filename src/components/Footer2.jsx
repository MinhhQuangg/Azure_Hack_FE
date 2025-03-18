import { chatlas, logo } from "../assets";
import { styles } from "../styles";

export const Footer2 = () => {
  return (
    <div
      className={`${styles.paddingX} bg-secondary w-full py-5 z-10 bottom-0`}
    >
      {/* <div className="w-full flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="cursor-pointer h-[45px]" />
            <img
              src={chatlas}
              alt="Logo"
              className="cursor-pointer w-[114px] h-[27px]"
            />
          </div>
        </div>
      </div> */}
      <div
        className={`mt-2 font-["Inter"] text-[1.25rem] flex flex-col md:flex-row justify-between`}
      >
        <div className="underline">chatlasplaceholder@gmail.com</div>
        <div>© 2025 Chatlas. All Rights Reserved</div>
      </div>
    </div>
  );
};
export default Footer2;
