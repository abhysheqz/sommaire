import BgGradient from "@/components/common/bg-gradient";
import HeroSection from "@/components/hero/hero-section";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="relative flex flex-col">
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
