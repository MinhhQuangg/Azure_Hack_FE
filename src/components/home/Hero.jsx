import React from "react";
import { styles } from "../../styles";
import { hero } from "../../assets";

const Hero = () => {
  const content = {
    tagline: "About Us",
    heading: "Connect Globally with Instant Translations",
    description:
      "Experience seemless commnuication with our Auto-Translator Chat Room app",
  };

  const buttonStyles = {
    primary: `bg-primary hover:bg-[#ECE17F] text-base md:text-lg lg:text-[1.45rem] font-bold font-["Inter"] py-2 px-4 md:py-3 md:px-5 rounded-[10px] transition-all duration-100`,
    secondary: `font-normal font-["Inter"] text-base md:text-lg lg:text-[1.45rem] py-2 px-4 md:py-3 md:px-5 rounded-[10px] border border-black transition-all duration-100`,
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
  };

  return (
    <div
      className={`${styles.paddingPageX} ${styles.paddingY} mt-20 flex flex-col md:flex-row justify-between md:gap-8 md:gap-10 w-full`}
    >
      <div className="w-full md:flex-1 flex flex-col justify-center gap-4 md:gap-6 order-2 md:order-1">
        <div
          className={`font-["Inter"] font-semibold text-lg md:text-[1.45rem]`}
        >
          {content.tagline}
        </div>

        <div
          className={`text-[#081C48] font-["Montserrat"] text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-bold leading-tight md:leading-[3rem] sm:leading-[2rem] lg:leading-[3.5rem]`}
        >
          {content.heading}
        </div>

        <div
          className={`font-["Inter"] text-base md:text-lg lg:text-[1.45rem] w-full md:w-[90%] lg:w-[80%]`}
        >
          {content.description}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 mt-2 md:mt-3">
          <button
            type="submit"
            className={buttonStyles.primary}
            style={{ boxShadow: buttonStyles.boxShadow }}
          >
            Get Started &#x2192;
          </button>

          <button className={buttonStyles.secondary}>
            Learn More &#x2192;
          </button>
        </div>
      </div>

      <div className="w-full md:flex-1 flex items-center justify-center order-1 md:order-2 mb-8 md:mb-0">
        <img
          src={hero}
          alt="hero"
          className="w-full max-w-md md:max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;
