import React, { forwardRef } from "react";
import { styles } from "../../styles";
import { earth, serviceOne, translateIcon } from "../../assets";
import { useNavigate } from "react-router-dom";

const Service = forwardRef((props, ref) => {
  const buttonStyle = `mt-5 lg:mt-0 bg-primary hover:bg-[#FFF48D] py-2 font-semibold rounded-md font-['Inter'] text-sm sm:text-base lg:text-[1.15rem] transition-all duration-150 text-center`;
  const cardTitleStyle =
    "font-['Montserrat'] font-bold text-lg sm:text-xl lg:text-[1.45rem] leading-tight sm:leading-[1.5rem] lg:leading-[1.75rem]";
  const cardLabelStyle =
    "font-['Inter'] text-sm sm:text-base lg:text-[1.15rem]";
  const boxShadow = { boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" };

  const navigate = useNavigate();

  const serviceCards = [
    {
      id: "translate",
      type: "large",
      label: "Translate",
      title: "Instantly Connect Across Languages",
      description: "Supports over 70 languages for effortless chatting",
      buttonText: "Supported Languages →",
      image: serviceOne,
      icon: null,
      toLink:
        "https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support",
    },
    {
      id: "communicate",
      type: "small",
      label: "Communicate",
      title: "Real-Time Translations",
      description: "Chat without language barriers, anytime, anywhere!",
      buttonText: "Start Chatting →",
      image: null,
      icon: translateIcon,
      toLink: "/Chat",
    },
    {
      id: "engage",
      type: "small",
      label: "Engage",
      title: "Multiple Language Support",
      description: "Choose your preferred language and start chatting",
      buttonText: "Language Preference →",
      image: null,
      icon: earth,
      toLink:
        "https://learn.microsoft.com/en-us/azure/ai-services/translator/language-support",
    },
  ];

  const renderServiceCard = (card) => {
    if (card.type === "large") {
      return (
        <div
          key={card.id}
          className="flex justify-between items-center border border-1 border-black rounded-xl overflow-hidden max-w-[80%] md:w-auto md:flex-3"
        >
          <div className="flex flex-col justify-between h-full p-6 w-full lg:w-[60%]">
            <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
              <div className={cardLabelStyle}>{card.label}</div>
              <div className={cardTitleStyle}>{card.title}</div>
              <div className={cardLabelStyle}>{card.description}</div>
            </div>
            <a
              href={card.toLink}
              target="_blank"
              className={buttonStyle}
              style={boxShadow}
            >
              {card.buttonText}
            </a>
          </div>
          <div className="hidden md:flex items-center justify-center h-full">
            <img
              src={card.image}
              alt="service"
              className="h-full object-cover"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={card.id}
          className="flex flex-col justify-between border border-1 border-black rounded-xl p-6 max-w-[80%] md:w-auto md:flex-2"
        >
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex justify-between items-center">
              <div className={cardLabelStyle}>{card.label}</div>
              <div>
                <img
                  src={card.icon}
                  alt="icon"
                  className="h-[20px] sm:h-[25px] md:h-[30px] lg:h-[45px]"
                />
              </div>
            </div>
            <div className={cardTitleStyle}>
              {card.title}
              {card.id === "communicate" && <br className="hidden sm:block" />}
            </div>
            <div className={cardLabelStyle}>{card.description}</div>
          </div>
          {card.id === "engage" ? (
            <a
              href={card.toLink}
              target="_blank"
              className={buttonStyle}
              style={boxShadow}
            >
              {card.buttonText}
            </a>
          ) : (
            <button
              onClick={() => {
                navigate(card.toLink);
              }}
              className={buttonStyle}
              style={boxShadow}
            >
              {card.buttonText}
            </button>
          )}
        </div>
      );
    }
  };

  return (
    <div ref={ref} className="w-full">
      <div
        className={`${styles.paddingPageX} ${styles.paddingY} flex flex-col gap-3 lg:gap-5 items-center`}
      >
        <div className="font-['Inter'] font-semibold text-base sm:text-lg md:text-[1.45rem]">
          Our Service
        </div>
        <div className="text-[#081C48] font-['Montserrat'] text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3rem] font-bold leading-tight md:leading-[2.5rem] lg:leading-[3.5rem]">
          Seamless Multilingual <br className="sm:block hidden" /> Communication
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-10 justify-around md:items-stretch items-center w-full mt-3">
          {serviceCards.map((card) => renderServiceCard(card))}
        </div>
      </div>
    </div>
  );
});

export default Service;
