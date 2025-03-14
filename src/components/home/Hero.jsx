import React from "react";
import { styles } from "../../styles";
import { hero } from "../../assets";

const Hero = () => {
  return (
    <div
      className={`${styles.paddingPageX} ${styles.paddingY} mt-20 flex justify-between gap-10`}
    >
      <div className="flex-1 flex flex-col justify-center 2xl:gap-4 xl:gap-2">
        <div
          className={`${styles.headerSubText} 2xl:mb-6 lg:mb-4 md:mb-4 mb-2`}
        >
          About us
        </div>
        <div className={`${styles.heroHeaderText}`}>Connect Globally with</div>
        <div className={`${styles.heroHeaderText}`}>Instant Translations</div>
        <div
          className={`${styles.headerSubText} 2xl:mt-6 lg:mt-4 md:mt-4 mt-2 `}
        >
          Experience seemless commnuication with out Auto-Translator Chat Room
          app
        </div>
        <div className="flex justify-around 2xl:mt-6  md:mt-4 mt-2">
          <button
            type="submit"
            className={`${styles.buttonText} bg-primary hover:bg-[#FFF48D] font-bold py-2 px-2 md:px-4 xl:px-6 rounded-xl `}
          >
            Get Started
          </button>
          <button
            className={`${styles.buttonText} bg-primary hover:bg-[#FFF48D] font-bold py-2 px-2 md:px-4 xl:px-6 rounded-xl `}
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center">
        <img src={hero} alt="hero" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;
