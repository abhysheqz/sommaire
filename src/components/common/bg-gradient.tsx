import { cn } from "@/lib/utils";
import React from "react";

interface BgGradientProps {
  children?: React.ReactNode;
  className?: string;
}

const BgGradient: React.FC<BgGradientProps> = ({ children, className }) => {
  return (
    <div className={cn("relative isolate", className)}>
      <div className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30">
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-br from-emerald-50-500 via-teal-500 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        ></div>
      </div>
      {children}
    </div>
  );
};

export default BgGradient;
