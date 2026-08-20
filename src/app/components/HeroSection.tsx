import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
import { useContent } from "../../lib/content";

interface HeroSectionProps {
  onScrollToNext: () => void;
}

export function HeroSection({ onScrollToNext }: HeroSectionProps) {
  const content = useContent();
  const s = content.settings || {};
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.from(heroTextRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-32 pt-20">
      <h2 
        ref={heroTextRef}
        className="text-6xl md:text-8xl lg:text-9xl font-black leading-none uppercase italic"
      >
        {s.hero_title1 || "BE THE"} <br />
        <span className="text-[#FACC15]">{s.hero_title2 || "CHANGE"}</span>
      </h2>
      <p className="mt-6 text-xl text-gray-400 max-w-2xl font-light">
        {s.hero_subtitle || "Empowering communities through Education, Healthcare, and Sustainable Development."}
      </p>
      <div className="flex gap-4 mt-10">
        <button 
          onClick={onScrollToNext}
          className="bg-[#FACC15] text-black px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] transition-all hover:scale-105"
        >
          {s.hero_btn1 || "Learn More"}
        </button>
        <button 
          onClick={onScrollToNext}
          className="border-2 border-[#FACC15] text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#FACC15] hover:text-black transition-all"
        >
          {s.hero_btn2 || "Our Mission"}
        </button>
      </div>

      {/* Scroll Indicator */}
      <button 
        onClick={onScrollToNext}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-[#FACC15] animate-bounce cursor-pointer"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
}