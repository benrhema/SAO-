import { Users, Calendar, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContent } from "../../lib/content";

export function VolunteerSection() {
  const content = useContent();
  const opportunities = content.volunteer_opportunities && content.volunteer_opportunities.length ? content.volunteer_opportunities : [];
  const requirements = (content.volunteer_requirements && content.volunteer_requirements.length ? content.volunteer_requirements : []).map((r: any) => r.text);
  const benefits = (content.volunteer_benefits && content.volunteer_benefits.length ? content.volunteer_benefits : []).map((b: any) => b.text);

  return (
    <section id="volunteer" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
          GET <span className="text-[#FACC15]">INVOLVED</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-3xl">
          Join our team of dedicated volunteers making a difference every day. Your time and skills 
          can change lives and strengthen our community.
        </p>

        {/* Hero Image */}
        <div className="relative h-96 mb-12 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwdm9sdW50ZWVycyUyMGdyb3VwJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzcwMjM1OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Volunteers Working Together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
            <div className="p-8 md:p-12">
              <h3 className="text-4xl font-black text-white mb-2">
                JOIN OUR <span className="text-[#FACC15]">VOLUNTEER FAMILY</span>
              </h3>
              <p className="text-gray-300 text-lg">
                Over 500 active volunteers making an impact every single day.
              </p>
            </div>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="mb-16">
          <h3 className="text-4xl font-black uppercase mb-8">
            CURRENT <span className="text-[#FACC15]">OPPORTUNITIES</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {opportunities.map((opportunity, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8 hover:border-[#FACC15] transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-black text-white group-hover:text-[#FACC15] transition-colors">
                    {opportunity.title}
                  </h4>
                  <Users className="text-[#FACC15]" size={24} />
                </div>
                
                <p className="text-gray-400 mb-6">
                  {opportunity.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <MapPin className="text-[#FACC15]" size={16} />
                    {opportunity.location}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <Clock className="text-[#FACC15]" size={16} />
                    {opportunity.time}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#FACC15] font-black">
                    <Calendar className="text-[#FACC15]" size={16} />
                    {opportunity.spots}
                  </div>
                </div>
                
                <button className="w-full bg-[#FACC15] text-black py-3 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] transition-all">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements & Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8">
            <h3 className="text-3xl font-black uppercase mb-6">
              REQUIREMENTS
            </h3>
            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#FACC15] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8">
            <h3 className="text-3xl font-black uppercase mb-6">
              BENEFITS
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="text-[#FACC15] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#FACC15] p-8 md:p-12 text-center">
          <h3 className="text-4xl font-black uppercase mb-4 text-black">
            READY TO MAKE A DIFFERENCE?
          </h3>
          <p className="text-black text-lg mb-6 max-w-2xl mx-auto">
            Fill out our volunteer application form and join hundreds of volunteers 
            creating positive change in our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#1a1a1a] transition-all">
              Volunteer Application
            </button>
            <button className="border-2 border-black text-black px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-black hover:text-[#FACC15] transition-all">
              Download Info Pack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
