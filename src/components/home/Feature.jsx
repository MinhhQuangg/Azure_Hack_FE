import React from "react";
import { styles } from "../../styles";
import { summarize } from "../../assets";

const Feature = () => {
  return (
    <div
      className={` ${styles.paddingPageX} ${styles.paddingY} flex flex-col gap-16 lg:gap-14 items-center`}
      style={{
        background:
          "linear-gradient(135deg, #ffd254 0%, #ffd254 40%, #fff48d 46%, #a5d9c7 54%, #25a59f 62%, #25a59f 100%)",
      }}
    >
      <div className={`${styles.headerSubText}`}> Features</div>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex-grow flex flex-col gap-4">
          <div className={`${styles.headerText}`}>
            Transform Conversations with Azure AI's Text to Speech and Speech to
            Text
          </div>
          <div
            className={`${styles.headerSubText}mt-4 sm:mt-1 text-lg text-gray-600`}
          >
            Enhance your chat experience with real-time audio capabilities.
            Azure AI Speech allows users to convert text to natural-sounding
            speech and vice versa, making communication seamless and engaging.
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
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex-shrink-0 flex justify-center items-center">
          <img
            src={summarize}
            alt="summarize"
            className="h-[150px] md:h-[400px] sm:h-[200px] object-contain"
          />
        </div>
        <div className="flex-grow flex flex-col gap-4">
          <div className={`${styles.headerText}`}>
            Easily Send Files in Your Chat Room
          </div>
          <div
            className={`${styles.headerSubText}mt-4 sm:mt-1 text-lg text-gray-600`}
          >
            Enhance your conversations by sharing files directly within the chat
            room. Whether it's documents, images, or other media, sending files
            is seamless and efficient.
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex-grow flex flex-col gap-4">
          <div className={`${styles.headerText}`}>
            Effortlessly Summarize Your Chats with Azure OpenAI Technology
          </div>
          <div
            className={`${styles.headerSubText}mt-4 sm:mt-1 text-lg text-gray-600`}
          >
            With Azure OpenAI, you can easily summarize conversations within a
            specified date range. This feature allows you to quickly catch up on
            important discussions without sifting through every message.
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
  );
};

export default Feature;
