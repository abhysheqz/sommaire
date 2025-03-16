import BgGradient from "@/components/common/bg-gradient";
import DemoSection from "@/components/hero/demo-section";
import HeroSection from "@/components/hero/hero-section";
import HowItWorksSection from "@/components/hero/how-it-works-section";
import PricingSection from "@/components/hero/pricing-section";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="relative flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
      </div>
    </div>
  );
};

export default Home;
