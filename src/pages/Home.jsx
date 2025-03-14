import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/home/hero";
import Mission from "../components/home/Mission";
import Service from "../components/home/Service";
import Footer from "../components/Footer";
import Feature from "../components/home/Feature";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Mission />
      <Service />
      <Feature />
      <Footer />
    </div>
  );
};

export default Home;
