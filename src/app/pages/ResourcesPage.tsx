import { Download, FileText, Image as ImageIcon, Video } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { useContent } from "../../lib/content";

export function ResourcesPage() {
  const content = useContent();
  const r = content.resources || {};
  const annualReports = r.reports && r.reports.length ? r.reports.map((x: any) => ({ ...x, year: x.year })) : [];
  const brochures = r.brochures && r.brochures.length ? r.brochures : [];
  const mediaKits = r.media && r.media.length ? r.media : [];
  const forms = r.forms && r.forms.length ? r.forms : [];

  return (
    <div className="min-h-screen pt-32 px-6 md:px-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="text-5xl md:text-7xl font-black uppercase mb-4">
            RESOURCES & <span className="text-[#FACC15]">DOWNLOADS</span>
          </h1>
          <p className="text-gray-400 text-lg mb-16 max-w-3xl">
            Access our reports, brochures, media kits, and forms. All resources are free to download and share.
          </p>
        </ScrollReveal>

        {/* Annual Reports */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            ANNUAL <span className="text-[#FACC15]">REPORTS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {annualReports.map((report, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8 hover:border-[#FACC15] transition-all group">
                <div className="bg-[#FACC15] w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="text-black" size={32} />
                </div>
                <div className="text-5xl font-black text-[#FACC15] mb-2">
                  {report.year}
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  {report.title}
                </h3>
                <div className="flex justify-between text-sm text-gray-400 mb-6">
                  <span>{report.size}</span>
                  <span>{report.downloads.toLocaleString()} downloads</span>
                </div>
                <button className="w-full bg-[#FACC15] text-black py-3 font-black uppercase text-xs tracking-widest hover:bg-[#ffd700] transition-all flex items-center justify-center gap-2">
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Brochures & Guides */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            BROCHURES & <span className="text-[#FACC15]">GUIDES</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {brochures.map((brochure, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 hover:border-[#FACC15] transition-all group flex items-start gap-4">
                <div className="bg-[#FACC15]/10 p-4 group-hover:bg-[#FACC15]/20 transition-colors">
                  <FileText className="text-[#FACC15]" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-white mb-2">
                    {brochure.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {brochure.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-xs">{brochure.size}</span>
                    <button className="text-[#FACC15] font-black uppercase text-xs tracking-wider hover:text-[#ffd700] transition-colors flex items-center gap-2">
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Media Kits */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            MEDIA <span className="text-[#FACC15]">KITS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {mediaKits.map((kit, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 hover:border-[#FACC15] transition-all group text-center">
                <div className="inline-flex bg-[#FACC15] w-16 h-16 items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {kit.type === "ZIP" ? (
                    <ImageIcon className="text-black" size={28} />
                  ) : (
                    <FileText className="text-black" size={28} />
                  )}
                </div>
                <h3 className="text-lg font-black text-white mb-2">
                  {kit.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {kit.description}
                </p>
                <div className="text-gray-500 text-xs mb-4">
                  {kit.type} • {kit.size}
                </div>
                <button className="bg-[#FACC15] text-black px-6 py-2 font-black uppercase text-xs tracking-wider hover:bg-[#ffd700] transition-all">
                  Download
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Forms */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            FORMS & <span className="text-[#FACC15]">APPLICATIONS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {forms.map((form, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 hover:border-[#FACC15] transition-all group flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-white mb-1">
                    {form.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {form.description}
                  </p>
                </div>
                <button className="text-[#FACC15] hover:text-[#ffd700] transition-colors">
                  <Download size={24} />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Newsletter Archive */}
        <ScrollReveal>
          <div className="bg-[#FACC15] p-12 text-center">
            <h2 className="text-4xl font-black uppercase mb-4 text-black">
              NEWSLETTER ARCHIVE
            </h2>
            <p className="text-black text-lg mb-8 max-w-2xl mx-auto">
              Browse past editions of our monthly newsletter to stay updated on our programs, 
              success stories, and upcoming events.
            </p>
            <button className="bg-black text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#1a1a1a] transition-all">
              View Archive
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
