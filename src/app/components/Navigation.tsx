import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "figma:asset/0699fd022831993dc955205474083a73289f227c.png";
import { HomeDropdown } from "./HomeDropdown";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/team", label: "Our Team" },
    { path: "/partners", label: "Our Partners" },
    { path: "/media", label: "Media Gallery" },
    { path: "/resources", label: "Resources" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#FACC15]/20">
      <div className="flex justify-between items-center p-4 md:p-6 lg:p-10 max-w-7xl mx-auto">
        <Link 
          to="/"
          className="flex items-center gap-2 md:gap-3 hover:scale-105 transition-transform group"
        >
          <img src={logo} alt="Smile Again Organization" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          <span className="text-2xl md:text-3xl font-black text-[#FACC15] tracking-tighter">SAO</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <HomeDropdown />
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`uppercase text-xs tracking-widest transition-colors ${
                isActive(item.path)
                  ? "text-[#FACC15] font-black"
                  : "text-white/60 font-medium hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            to="/donate"
            className="bg-[#FACC15] text-black px-6 py-2 font-black uppercase text-xs tracking-widest hover:bg-[#ffd700] transition-colors"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#FACC15] p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-[#FACC15]/20 p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <HomeDropdown isMobile onClose={() => setMobileMenuOpen(false)} />
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`uppercase text-xs tracking-widest text-left py-2 transition-colors ${
                  isActive(item.path)
                    ? "text-[#FACC15] font-black"
                    : "text-white/60 font-medium"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#FACC15] text-black px-6 py-3 font-black uppercase text-xs tracking-widest mt-2 text-center"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}