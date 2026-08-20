import { Play, Youtube, Camera, Film } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import { Link } from "react-router-dom";
import { useContent } from "../../lib/content";

export function MediaPage() {
  const content = useContent();
  const videos = content.media && content.media.all && content.media.all.length ? content.media.all : [];
  const photoGalleries = content.photo_galleries && content.photo_galleries.length ? content.photo_galleries : [];

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 md:px-12 lg:px-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-4">
            MEDIA <span className="text-[#FACC15]">GALLERY</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-16 max-w-3xl">
            Watch our impact unfold through videos, photos, and stories from the communities we serve.
          </p>
        </ScrollReveal>

        {/* Video Categories */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-12">
            <Link 
              to="/media"
              className="bg-[#FACC15] text-black px-4 sm:px-6 py-2 font-black uppercase text-xs tracking-wider"
            >
              All Videos
            </Link>
            <Link 
              to="/media/impact-stories"
              className="bg-[#1a1a1a] border border-[#FACC15]/20 text-white px-4 sm:px-6 py-2 font-black uppercase text-xs tracking-wider hover:border-[#FACC15] hover:bg-[#FACC15] hover:text-black transition-all"
            >
              Impact Stories
            </Link>
            <Link 
              to="/media/programs"
              className="bg-[#1a1a1a] border border-[#FACC15]/20 text-white px-4 sm:px-6 py-2 font-black uppercase text-xs tracking-wider hover:border-[#FACC15] hover:bg-[#FACC15] hover:text-black transition-all"
            >
              Programs
            </Link>
            <Link 
              to="/media/events"
              className="bg-[#1a1a1a] border border-[#FACC15]/20 text-white px-4 sm:px-6 py-2 font-black uppercase text-xs tracking-wider hover:border-[#FACC15] hover:bg-[#FACC15] hover:text-black transition-all"
            >
              Events
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured Video */}
        {videos.filter(v => v.featured).map((video, index) => (
          <ScrollReveal key={index}>
            <div className="bg-[#1a1a1a] border border-[#FACC15]/20 mb-12 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 group cursor-pointer">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#FACC15] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-[#FACC15] font-black uppercase text-sm mb-2 tracking-wider">
                    {video.category}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    {video.title}
                  </h2>
                  <p className="text-gray-400 text-lg mb-6">
                    {video.description}
                  </p>
                  <button className="bg-[#FACC15] text-black px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] transition-all w-fit">
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Video Grid */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            ALL <span className="text-[#FACC15]">VIDEOS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {videos.filter(v => !v.featured).map((video, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden hover:border-[#FACC15] transition-all group">
                <div className="relative h-56 overflow-hidden cursor-pointer">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="w-16 h-16 bg-[#FACC15] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
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
                <div className="p-6">
                  <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#FACC15] transition-colors">
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

        {/* Photo Galleries */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            PHOTO <span className="text-[#FACC15]">GALLERIES</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {photoGalleries.map((gallery, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden hover:border-[#FACC15] transition-all group cursor-pointer">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={gallery.cover}
                    alt={gallery.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <Camera className="text-[#FACC15]" size={40} />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-white mb-1">
                    {gallery.title}
                  </h3>
                  <p className="text-[#FACC15] text-sm font-black">
                    {gallery.count} Photos
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <ScrollReveal>
          <div className="bg-[#FACC15] p-12 text-center">
            <Youtube className="mx-auto mb-4 text-black" size={64} />
            <h2 className="text-4xl font-black uppercase mb-4 text-black">
              SUBSCRIBE TO OUR CHANNEL
            </h2>
            <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
              Stay updated with our latest videos, impact stories, and community highlights. 
              Join our growing community on YouTube.
            </p>
            <button className="bg-black text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#1a1a1a] transition-all">
              Visit Our YouTube Channel
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}