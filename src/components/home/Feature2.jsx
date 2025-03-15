import React from "react";
import { styles } from "../../styles";
import { folder, micro, summarize } from "../../assets";

const Feature2 = () => {
  return (
    <div
      className={` ${styles.paddingPageX} ${styles.paddingY} flex flex-col lg:gap-14 items-center`}
      style={{
        background:
          "linear-gradient(135deg, #ffd254 0%, #ffd254 40%, #fff48d 46%, #a5d9c7 54%, #25a59f 62%, #25a59f 100%)",
      }}
    >
      <div className="font-['Inter'] font-semibold text-base sm:text-lg md:text-[1.45rem]">
        Our Features
      </div>
      <div className="flex flex-col gap-10 lg:gap-16 mt-10 lg:mt-16">
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex-grow flex flex-col gap-4">
            <div
              className={`text-[#081C48] font-["Montserrat"] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] font-bold leading-tight md:leading-[2.5rem] lg:leading-[3.5rem]`}
            >
              Transform Conversations with Azure AI's Text to Speech and Speech
              to Text
            </div>
            <div
              className={`font-['Inter'] text-base md:text-lg lg:text-[1.45rem] w-[90%]`}
            >
              Enhance your chat experience with real-time audio capabilities.
              Azure AI Speech allows users to convert text to natural-sounding
              speech and vice versa, making communication seamless and engaging.
            </div>
          </div>
          <div className="flex-shrink-0 flex justify-center items-center">
            <img
              src={micro}
              alt="summarize"
              className="h-[150px] md:h-[400px] sm:h-[200px] object-contain"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-10">
          <div className="flex-shrink-0 flex justify-center items-center">
            <img
              src={folder}
              alt="summarize"
              className="h-[150px] md:h-[400px] sm:h-[200px] object-contain"
            />
          </div>
          <div className="flex-grow flex flex-col gap-4">
            <div
              className={`text-[#081C48] font-["Montserrat"] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] font-bold leading-tight md:leading-[2.5rem] lg:leading-[3.5rem]`}
            >
              Easily Send Files in Your <br /> Chat Room
            </div>
            <div
              className={`font-['Inter'] text-base md:text-lg lg:text-[1.45rem] w-[90%]`}
            >
              Enhance your conversations by sharing files directly within the
              chat room. Whether it's documents, images, or other media, sending
              files is seamless and efficient.
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full gap-2">
          <div className="flex-grow flex flex-col gap-4">
            <div
              className={`text-[#081C48] font-["Montserrat"] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] font-bold leading-tight md:leading-[2.5rem] lg:leading-[3.5rem]`}
            >
              Effortlessly Summarize Your Chats with Azure OpenAI Technology
            </div>
            <div
              className={`font-['Inter'] text-base md:text-lg lg:text-[1.45rem] w-[90%]`}
            >
              With Azure OpenAI, you can easily summarize conversations within a
              specified date range. This feature allows you to quickly catch up
              on important discussions without sifting through every message.
            </div>
          </div>
          <div className="flex-shrink-0 flex justify-center items-center">
            <img
              src={summarize}
              alt="summarize"
              className="h-[150px] md:h-[400px] sm:h-[200px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature2;
