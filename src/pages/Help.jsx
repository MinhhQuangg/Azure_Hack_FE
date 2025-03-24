import React from "react";
import Contact from "../components/home/Contact";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { styles } from "../styles";

const Help = () => {
  return (
    <div>
      <NavBar />
      <div className={`${styles.paddingY}`}>
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Help;
