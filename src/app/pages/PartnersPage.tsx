import { useEffect, useState } from "react";
import { Building2, Handshake, Award } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";

interface ApiPartner {
  id: string;
  name: string;
  abbreviation: string | null;
  sector_or_scope: string;
  partnership_since: string | null;
  logo_url: string | null;
  category: string;
  category_name: string;
  display_order: number;
}

interface ApiTestimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  organization_name: string;
  display_order: number;
}

const PARTNERS_URL = "http://127.0.0.1:8000/api/partners/";
const TESTIMONIALS_URL = "http://127.0.0.1:8000/api/partner-testimonials/";

export function PartnersPage() {
  const [partners, setPartners] = useState<ApiPartner[]>([]);
  const [testimonials, setTestimonials] = useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(PARTNERS_URL).then((res) => {
        if (!res.ok) throw new Error(`Partners request failed: ${res.status}`);
        return res.json();
      }),
      fetch(TESTIMONIALS_URL).then((res) => {
        if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);
        return res.json();
      }),
    ])
      .then(([partnersData, testimonialsData]) => {
        setPartners(partnersData);
        setTestimonials(testimonialsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const matchesCategory = (categoryName: string, keyword: string) =>
    categoryName?.toLowerCase().includes(keyword);

  const corporatePartners = partners.filter((p) => matchesCategory(p.category_name, "corporate"));
  const governmentPartners = partners.filter((p) => matchesCategory(p.category_name, "government"));
  const ngoPartners = partners.filter(
    (p) => !matchesCategory(p.category_name, "corporate") && !matchesCategory(p.category_name, "government")
  );

  return (
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-12 lg:px-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-4">
            OUR <span className="text-[#FACC15]">PARTNERS</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-12 sm:mb-16 max-w-3xl">
            Together with our partners, we're creating lasting change and empowering communities worldwide.
          </p>
        </ScrollReveal>

        {loading && <p className="text-gray-400 mb-12">Loading partners...</p>}
        {error && (
          <p className="text-red-400 mb-12">
            Couldn't load partners right now. Make sure the Django server is running at {PARTNERS_URL}
          </p>
        )}

        {/* Partnership Stats */}
        <ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="bg-[#FACC15] p-6 sm:p-8 text-center">
              <Building2 className="mx-auto mb-4 text-black" size={48} />
              <div className="text-5xl font-black text-black mb-2">{corporatePartners.length}+</div>
              <div className="text-black font-black uppercase tracking-wider">
                Corporate Partners
              </div>
            </div>
            <div className="bg-[#FACC15] p-6 sm:p-8 text-center">
              <Handshake className="mx-auto mb-4 text-black" size={48} />
              <div className="text-5xl font-black text-black mb-2">{ngoPartners.length}+</div>
              <div className="text-black font-black uppercase tracking-wider">
                NGO Collaborations
              </div>
            </div>
            <div className="bg-[#FACC15] p-6 sm:p-8 text-center">
              <Award className="mx-auto mb-4 text-black" size={48} />
              <div className="text-5xl font-black text-black mb-2">{governmentPartners.length}+</div>
              <div className="text-black font-black uppercase tracking-wider">
                Government Agencies
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Corporate Partners */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            CORPORATE <span className="text-[#FACC15]">PARTNERS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {corporatePartners.map((partner, index) => (
            <ScrollReveal key={partner.id} delay={index * 0.05}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8 hover:border-[#FACC15] transition-all group hover:scale-105">
                <div className="flex items-center justify-center h-24 mb-6 bg-white/5 group-hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-black text-[#FACC15]">
                    {partner.abbreviation || partner.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                </div>
                <h3 className="text-xl font-black text-white mb-2">
                  {partner.name}
                </h3>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{partner.sector_or_scope}</span>
                  {partner.partnership_since && (
                    <span className="text-[#FACC15] font-black">Since {partner.partnership_since}</span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Government Partners */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            GOVERNMENT <span className="text-[#FACC15]">PARTNERS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {governmentPartners.map((partner, index) => (
            <ScrollReveal key={partner.id} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 hover:border-[#FACC15] transition-all group hover:scale-105">
                <Building2 className="text-[#FACC15] mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="font-black text-white mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-sm uppercase">
                  {partner.sector_or_scope}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* NGO & Community Partners */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            NGO & COMMUNITY <span className="text-[#FACC15]">PARTNERS</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {ngoPartners.map((partner, index) => (
            <ScrollReveal key={partner.id} delay={index * 0.05}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 hover:border-[#FACC15] transition-all group">
                <h3 className="font-black text-white mb-2 group-hover:text-[#FACC15] transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {partner.category_name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Partner Testimonials */}
        <ScrollReveal>
          <h2 className="text-4xl font-black uppercase mb-8">
            WHAT OUR PARTNERS <span className="text-[#FACC15]">SAY</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.2}>
              <div className="bg-[#FACC15] p-8">
                <p className="text-black text-lg italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t-2 border-black pt-4">
                  <div className="font-black text-black text-lg">
                    {testimonial.author_name}
                  </div>
                  <div className="text-black text-sm">
                    {testimonial.author_role}, {testimonial.organization_name}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Become a Partner CTA */}
        <ScrollReveal>
          <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-12 text-center">
            <h2 className="text-4xl font-black uppercase mb-4">
              BECOME A <span className="text-[#FACC15]">PARTNER</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join us in creating lasting change. Partner with SAO to amplify your impact and
              transform communities together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#FACC15] text-black px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] transition-all">
                Partnership Inquiry
              </button>
              <button className="border-2 border-[#FACC15] text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#FACC15] hover:text-black transition-all">
                Download Partnership Guide
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
