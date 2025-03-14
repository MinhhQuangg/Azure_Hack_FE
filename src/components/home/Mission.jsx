import React from "react";
import { mission } from "../../assets";
import { styles } from "../../styles";

const Mission = () => {
  return (
    <div
      className="bg-cover bg-center relative rounded-2xl h-[350px] sm:h-[400px] md:h-[500px] lg:h-[800px] 2xl:h-[900px]"
      style={{
        backgroundImage: `url(${mission})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={` ${styles.paddingPageX} ${styles.paddingY} flex flex-col lg:gap-4 items-center`}
      >
        <div
          className={`${styles.headerSubText} 2xl:mb-6 lg:mb-4 md:mb-4 mb-2`}
        >
          Our mission
        </div>
        <div className={`${styles.headerText}`}>A World Without</div>
        <div className={`${styles.headerText}`}>Language Barriers</div>
        <div
          className={`${styles.headerSubText} 2xl:mt-6 lg:mt-4 md:mt-4 mt-2 text-center`}
        >
          By combining cutting-edge AI with secure, seamless access, we bring
          people together-breaking down linguistic dvides and building a more
          connected world.
        </div>
      </div>
    </div>
  );
};

export default Mission;
