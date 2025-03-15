import React from "react";
import { styles } from "../../styles";
import { earth, serviceOne, translateIcon } from "../../assets";

const Service2 = () => {
  return (
    <div className="w-full">
      <div
        className={`${styles.paddingPageX} ${styles.paddingY} flex flex-col gap-3 lg:gap-5 items-center`}
      >
        <div className="font-['Inter'] font-semibold text-base sm:text-lg md:text-[1.45rem]">
          Our Service
        </div>
        <div
          className={`text-[#081C48] font-["Montserrat"] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] font-bold leading-tight md:leading-[2.5rem] lg:leading-[3.5rem]`}
        >
          Seamless Multilingual <br className="sm:block hidden" /> Communication
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-10 justify-around md:items-stretch items-center w-full mt-3">
          <div className="flex justify-between items-center border border-1 border-black rounded-xl overflow-hidden max-w-[80%] md:w-auto md:flex-3">
            <div className="flex flex-col justify-between h-full p-6 w-full lg:w-[60%]">
              <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                <div className="font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]">
                  Translate
                </div>
                <div className="font-['Montserrat'] font-bold text-lg sm:text-xl lg:text-[1.45rem] leading-tight sm:leading-[1.5rem] lg:leading-[1.75rem]">
                  Instantly Connect Across Languages
                </div>
                <div className="font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]">
                  Supports over 70 languages for effortless chatting
                </div>
              </div>
              <button
                type="submit"
                className={`mt-5 lg:mt-0 bg-primary hover:bg-[#FFF48D] py-2 font-semibold rounded-md font-['Inter'] text-sm sm:text-base lg:text-[1.15rem] transition-all duration-150`}
                style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                Supported Languages &#x2192;
              </button>
            </div>
            <div className="hidden md:flex items-center justify-center h-full">
              <img
                src={serviceOne}
                alt="service"
                className="h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between border border-1 border-black rounded-xl p-6 max-w-[80%] md:w-auto md:flex-2">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex justify-between items-center">
                <div className="font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]">
                  Communicate
                </div>
                <div>
                  <img
                    src={translateIcon}
                    alt="icon"
                    className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[45px]"
                  />
                </div>
              </div>
              <div className="font-['Montserrat'] font-bold text-lg sm:text-xl lg:text-[1.45rem] leading-tight sm:leading-[1.5rem] lg:leading-[1.75rem]">
                Real-Time <br className="hidden sm:block" />
                Translations
              </div>
              <div className="font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]">
                Chat without language barriers, anytime, anywhere!
              </div>
            </div>
            <button
              type="submit"
              className={`mt-5 lg:mt-0 bg-primary hover:bg-[#FFF48D] py-2 font-semibold rounded-md font-['Inter'] text-sm sm:text-base lg:text-[1.15rem] transition-all duration-150`}
              style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              Start Chatting &#x2192;
            </button>
          </div>

          <div className="flex flex-col justify-between border border-1 border-black rounded-xl p-6 max-w-[80%] md:w-auto md:flex-2">
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex justify-between items-center">
                <div className="font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]">
                  Engage
                </div>
                <div>
                  <img
                    src={earth}
                    alt="icon"
                    className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[45px]"
                  />
                </div>
              </div>
              <div className="font-['Montserrat'] font-bold text-lg sm:text-xl lg:text-[1.45rem] leading-tight sm:leading-[1.5rem] lg:leading-[1.75rem]">
                Multiple Language Support
              </div>
              <div className="font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]">
                Choose your preferred language and start chatting
              </div>
            </div>
            <button
              type="submit"
              className={`mt-5 lg:mt-0 bg-primary hover:bg-[#FFF48D] py-2 font-semibold rounded-md font-['Inter'] text-sm sm:text-base lg:text-[1.15rem] transition-all duration-150`}
              style={{ boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              Language Preference &#x2192;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service2;
