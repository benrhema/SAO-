import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to(logoRef.current, { 
      opacity: 1, 
      y: -20, 
      duration: 1 
    })
      .to(barRef.current, { 
        width: "100%", 
        duration: 0.8 
      })
      .to(splashRef.current, { 
        y: "-100%", 
        duration: 1.2, 
        ease: "expo.inOut", 
        delay: 0.5 
      });
  }, [onComplete]);

  return (
    <div 
      ref={splashRef}
      className="fixed inset-0 w-full h-full bg-black z-[999] flex justify-center items-center"
    >
      <div className="text-center">
        <h1 
          ref={logoRef}
          className="text-6xl font-black tracking-tighter text-[#FACC15] opacity-0"
        >
          SMILE AGAIN ORGANIZATION
        </h1>
        <div 
          ref={barRef}
          className="w-0 h-2 bg-[#FACC15] mt-4 mx-auto"
        />
      </div>
    </div>
  );
}