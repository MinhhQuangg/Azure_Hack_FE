import React, { useRef } from "react";
import Footer from "../components/Footer";
import Feature from "../components/home/Feature";
import Hero from "../components/home/Hero";
import Mission from "../components/home/Mission";
import Service from "../components/home/Service";
import NavBar from "../components/NavBar";
import Contact from "../components/home/Contact";

const Home = () => {
  const serviceRef = useRef(null);

  return (
    <div>
      <NavBar />
      <Hero serviceRef={serviceRef} />
      <Mission />
      <Service ref={serviceRef} />
      <Feature />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
