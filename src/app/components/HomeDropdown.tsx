import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function HomeDropdown({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const homeLinks = [
    { id: "hero", label: "Home", hash: "" },
    { id: "about", label: "About Us", hash: "#about" },
    { id: "programs", label: "Programs", hash: "#programs" },
    { id: "impact", label: "Impact", hash: "#impact" },
    { id: "volunteer", label: "Volunteer", hash: "#volunteer" },
    { id: "events", label: "Events", hash: "#events" },
    { id: "news", label: "News", hash: "#news" },
    { id: "donate", label: "Donate", hash: "#donate" },
    { id: "contact", label: "Contact", hash: "#contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNavigate = (hash: string) => {
    navigate(`/${hash}`);
    setIsOpen(false);
    if (onClose) onClose();
    
    // Scroll to section after navigation
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isMobile) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="uppercase text-xs tracking-widest text-left py-2 transition-colors text-white/60 font-medium flex items-center justify-between"
        >
          Home
          <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={16} />
        </button>
        {isOpen && (
          <div className="pl-4 flex flex-col gap-2 mt-2 border-l-2 border-[#FACC15]/20">
            {homeLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.hash)}
                className="uppercase text-xs tracking-widest text-left py-1 transition-colors text-gray-400 hover:text-[#FACC15]"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className="uppercase text-xs tracking-widest transition-colors text-white/60 font-medium hover:text-white flex items-center gap-1"
      >
        Home
        <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={14} />
      </button>
      
      {isOpen && (
        <div 
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-2 bg-black border border-[#FACC15]/20 min-w-[200px] py-2 z-50"
        >
          {homeLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.hash)}
              className="w-full text-left px-6 py-2 uppercase text-xs tracking-widest transition-colors text-gray-400 hover:text-[#FACC15] hover:bg-[#FACC15]/10"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
