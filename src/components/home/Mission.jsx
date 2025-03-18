import React from "react";
import { mission } from "../../assets";
import { styles } from "../../styles";

const Mission = () => {
  const content = {
    tagline: "Our Mission",
    heading: "A World Without \nLanguage Barriers",
    description:
      "By combining cutting-edge AI with secure, seamless access, we bring people together-breaking down linguistic dvides and building a more connected world.",
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${mission})`,
    backgroundRepeat: "no-repeat",
  };

  const mobileImageStyle = {
    objectFit: "cover",
    objectPosition: "bottom",
  };

  return (
    <div className="rounded-2xl relative">
      <div
        className="hidden md:block bg-cover bg-center absolute inset-0 w-full h-full rounded-2xl"
        style={backgroundImageStyle}
      />

      <div
        className={`${styles.paddingPageX} ${styles.paddingY} flex flex-col lg:mt-10 gap-4 lg:gap-6 items-center relative md:h-[500px] lg:h-[800px] 2xl:h-[900px]`}
      >
        <div className="font-['Inter'] font-semibold text-lg md:text-[1.45rem]">
          {content.tagline}
        </div>

        <div className="text-[#081C48] font-['Montserrat'] text-center text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-bold leading-tight sm:leading-[2rem] md:leading-[3rem] lg:leading-[3.5rem]">
          {content.heading.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < content.heading.split("\n").length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>

        <div className="font-['Inter'] text-center text-base md:text-lg lg:text-[1.45rem] w-full md:w-[90%] lg:w-[70%]">
          {content.description}
        </div>
      </div>

      <div className="md:hidden w-full sm:h-[15em] overflow-hidden">
        <img
          src={mission}
          alt="Our mission"
          className="w-full h-full rounded-b-2xl"
          style={mobileImageStyle}
        />
      </div>
    </div>
  );
};

export default Mission;
