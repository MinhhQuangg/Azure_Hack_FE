import React from "react";
import { styles } from "../../styles";
import { earth, serviceOne, translateIcon } from "../../assets";

const Service = () => {
  return (
    <div>
      <div
        className={` ${styles.paddingPageX} ${styles.paddingY} flex flex-col lg:gap-4 items-center`}
      >
        <div
          className={`${styles.headerSubText} 2xl:mb-6 lg:mb-4 md:mb-4 mb-2`}
        >
          Our Service
        </div>
        <div className={`${styles.headerText}`}>Seamless Multilingual </div>
        <div className={`${styles.headerText} 2xl:mb-20 lg:mb-4 md:mb-4 mb-2`}>
          Communication
        </div>
        <div className="flex gap-10 justify-around items-stretch w-full">
          <div className="flex justify-between items border-2 border-black rounded-xl flex-3 p-4 gap-4">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2">
                <div className={`${styles.sectionSubText}`}>Translate</div>
                <div className={`${styles.sectionHeadText}`}>
                  Instantly Connect Across Languages
                </div>

                <div className={`${styles.sectionSubText}`}>
                  Supports over 70 languages for effortless chatting
                </div>
              </div>
              <button
                type="submit"
                className={`${styles.buttonServiceText} bg-primary hover:bg-[#FFF48D] md:mt-3 mt-2 font-bold rounded-xl py-1`}
              >
                Support Languages
              </button>
            </div>
            <div className="hidden xl:flex items-center justify-center">
              <img
                src={serviceOne}
                alt="service"
                className="h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between items border-2 border-black rounded-xl p-4 flex-2">
            <div className="flex flex-col gap-3 ">
              <div className="flex justify-between items-center">
                <div className={`${styles.sectionSubText}`}>Communitcate</div>
                <div>
                  <img
                    src={translateIcon}
                    alt="icon"
                    className="lg:h-[45px] md:h-[30px] xs:h-[20px] h-[20px]"
                  />
                </div>
              </div>
              <div className={`${styles.sectionHeadText}`}>
                Real-Time Translations
              </div>

              <div className={`${styles.sectionSubText}`}>
                Chat without language barriers, anytime, anywhere!
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.buttonServiceText} bg-primary hover:bg-[#FFF48D] md:mt-3 mt-2 font-bold rounded-xl py-1`}
            >
              Start Chatting
            </button>
          </div>

          <div className="flex flex-col justify-between border-2 border-black rounded-xl p-4 flex-2">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className={`${styles.sectionSubText}`}>Engage</div>
                <div>
                  <img
                    src={earth}
                    alt="icon"
                    className="lg:h-[45px] md:h-[30px] xs:h-[20px] h-[20px]"
                  />
                </div>
              </div>
              <div className={`${styles.sectionHeadText}`}>
                Multiple Language Support
              </div>

              <div className={`${styles.sectionSubText}`}>
                Choose your preferred language and start chatting
              </div>
            </div>

            <button
              type="submit"
              className={`${styles.buttonServiceText} bg-primary hover:bg-[#FFF48D] md:mt-3 mt-2 font-bold rounded-xl py-1`}
            >
              Language preference
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
