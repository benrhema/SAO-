import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { ParticlesBackground } from "./components/ParticlesBackground";
import { SplashScreen } from "./components/SplashScreen";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { ContentProvider } from "../lib/content";
import { getShowPublicNav, setShowPublicNav, onNavVisibilityChange } from "../lib/navVisibility";
import { AdminApp } from "./admin/AdminApp";
import { HomePage } from "./pages/HomePage";
import { TeamPage } from "./pages/TeamPage";
import { PartnersPage } from "./pages/PartnersPage";
import { MediaPage } from "./pages/MediaPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { DonatePage } from "./pages/DonatePage";
import { ImpactStoriesPage } from "./pages/ImpactStoriesPage";
import { ProgramsMediaPage } from "./pages/ProgramsMediaPage";
import { EventsMediaPage } from "./pages/EventsMediaPage";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);
  const [showNav, setShowNavState] = useState(getShowPublicNav());

  useEffect(() => onNavVisibilityChange(() => setShowNavState(getShowPublicNav())), []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setTimeout(() => {
      setMainVisible(true);
    }, 100);
  };

  return (
    <Router>
      <ContentProvider>
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          
          <ParticlesBackground />
          
          <main 
            className={`relative z-10 transition-opacity duration-1000 ${
              mainVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {showNav && <Navigation />}

            <button
              onClick={() => setShowPublicNav(!showNav)}
              title={showNav ? "Hide navigation" : "Show navigation"}
              className="fixed bottom-4 right-4 z-[60] bg-black/80 border border-[#FACC15]/40 text-[#FACC15] p-2 rounded-full hover:bg-black hover:border-[#FACC15] transition-all"
            >
              {showNav ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/media/impact-stories" element={<ImpactStoriesPage />} />
              <Route path="/media/programs" element={<ProgramsMediaPage />} />
              <Route path="/media/events" element={<EventsMediaPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/admin/*" element={<AdminApp />} />
            </Routes>
            
            <Footer />
          </main>
          <Toaster theme="dark" />
        </div>
      </ContentProvider>
    </Router>
  );
}