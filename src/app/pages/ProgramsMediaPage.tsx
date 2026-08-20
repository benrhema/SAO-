import { Play } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import { Link } from "react-router-dom";
import { useContent } from "../../lib/content";

export function ProgramsMediaPage() {
  const content = useContent();
  const programVideos = content.media && content.media.programs && content.media.programs.length ? content.media.programs : [];
  const categories = ["All", "Education", "Healthcare", "Job Training", "Disability Services", "Food Security", "Housing"];

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 md:px-12 lg:px-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-6">
            <Link to="/media" className="text-[#FACC15] hover:text-[#ffd700] text-sm uppercase tracking-wider">
              ← Back to Media Gallery
            </Link>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-4">
            PROGRAM <span className="text-[#FACC15]">VIDEOS</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-12 max-w-3xl">
            Explore our various programs in action. See how we're making a difference through 
            education, healthcare, job training, and more.
          </p>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-[#1a1a1a] border border-[#FACC15]/20 text-white px-4 sm:px-6 py-2 font-black uppercase text-xs tracking-wider hover:border-[#FACC15] hover:bg-[#FACC15] hover:text-black transition-all"
              >
                {category}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured Program */}
        {programVideos.filter(v => v.featured).map((video, index) => (
          <ScrollReveal key={index}>
            <div className="bg-[#1a1a1a] border border-[#FACC15]/20 mb-12 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 sm:h-80 md:h-96 group cursor-pointer">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FACC15] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-black fill-black ml-1" size={32} />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#FACC15] text-black px-3 py-1 font-black text-xs uppercase">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="bg-black/80 text-[#FACC15] px-3 py-1 font-black text-sm">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-[#FACC15] font-black uppercase text-sm mb-2 tracking-wider">
                    {video.category}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
                    {video.title}
                  </h2>
                  <p className="text-gray-400 text-base sm:text-lg mb-6">
                    {video.description}
                  </p>
                  <button className="bg-[#FACC15] text-black px-6 sm:px-8 py-3 sm:py-4 font-black uppercase text-xs sm:text-sm tracking-widest hover:bg-[#ffd700] transition-all w-fit">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* All Program Videos */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-8">
            ALL PROGRAM <span className="text-[#FACC15]">VIDEOS</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programVideos.filter(v => !v.featured).map((video, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden hover:border-[#FACC15] transition-all group">
                <div className="relative h-48 sm:h-56 overflow-hidden cursor-pointer">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FACC15] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-black fill-black ml-1" size={24} />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/80 text-[#FACC15] px-2 py-1 font-black text-xs uppercase">
                      {video.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/80 text-[#FACC15] px-2 py-1 font-black text-xs">
                      {video.duration}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-black text-white mb-2 group-hover:text-[#FACC15] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {video.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
