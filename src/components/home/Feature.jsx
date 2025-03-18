import React from "react";
import { styles } from "../../styles";
import { folder, micro, summarize } from "../../assets";

const Feature = () => {
  const titleStyle =
    "text-[#081C48] font-['Montserrat'] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] font-bold leading-tight md:leading-[2.5rem] lg:leading-[3.5rem]";
  const descriptionStyle =
    "font-['Inter'] text-base md:text-lg lg:text-[1.45rem] w-[90%]";
  const imageStyle = "h-[150px] sm:h-[200px] md:h-[400px] object-contain";

  const featuresData = [
    {
      id: "speech",
      title:
        "Transform Conversations with Azure AI's Text to Speech and Speech to Text",
      description:
        "Enhance your chat experience with real-time audio capabilities. Azure AI Speech allows users to convert text to natural-sounding speech and vice versa, making communication seamless and engaging.",
      image: micro,
      imageAlt: "Text to Speech feature",
      imageRight: true,
    },
    {
      id: "files",
      title: "Easily Send Files in Your Chat Room",
      description:
        "Enhance your conversations by sharing files directly within the chat room. Whether it's documents, images, or other media, sending files is seamless and efficient.",
      image: folder,
      imageAlt: "File sharing feature",
      imageRight: false,
    },
    {
      id: "summarize",
      title: "Effortlessly Summarize Your Chats with Azure OpenAI Technology",
      description:
        "With Azure OpenAI, you can easily summarize conversations within a specified date range. This feature allows you to quickly catch up on important discussions without sifting through every message.",
      image: summarize,
      imageAlt: "Chat summarization feature",
      imageRight: true,
    },
  ];

  const renderFeatureItem = (feature) => {
    return (
      <div
        key={feature.id}
        className="flex lg:flex-row flex-col items-center justify-between w-full lg:gap-20 mb-6"
      >
        {!feature.imageRight && (
          <div className="flex-shrink-0 flex justify-center items-center order-3 lg:order-[-1] mt-8 lg:mt-0">
            <img
              src={feature.image}
              alt={feature.imageAlt}
              className={imageStyle}
            />
          </div>
        )}

        <div className="flex-grow flex flex-col gap-4">
          <div className={titleStyle}>{feature.title}</div>
          <div className={descriptionStyle}>{feature.description}</div>
        </div>

        {feature.imageRight && (
          <div className="flex-shrink-0 flex justify-center items-center mt-8 lg:mt-0">
            <img
              src={feature.image}
              alt={feature.imageAlt}
              className={imageStyle}
            />
          </div>
        )}
      </div>
    );
  };

  // Main component return similar to Service2
  return (
    <div
      className={`${styles.paddingPageX} xl:pt-18 lg:pt-16 md:pt-12 sm:pt-8 pt-6 flex flex-col lg:gap-14 items-center`}
      style={{
        background:
          "linear-gradient(135deg, #ffd254 0%, #ffd254 40%, #fff48d 46%, #a5d9c7 54%, #25a59f 62%, #25a59f 100%)",
      }}
    >
      <div className="font-['Inter'] font-semibold text-base sm:text-lg md:text-[1.45rem]">
        Our Features
      </div>

      <div className="flex flex-col gap-10 lg:gap-16 mt-10 lg:mt-16">
        {featuresData.map((feature) => renderFeatureItem(feature))}
      </div>
    </div>
  );
};

export default Feature;
