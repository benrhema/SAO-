import { Linkedin, Mail } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ScrollReveal } from "../components/ScrollReveal";
import { useContent } from "../../lib/content";

export function TeamPage() {
  const content = useContent();
  const team = content.team && content.team.length ? content.team : [];
  const leadership = team.filter((m) => m.type === "leadership");
  const boardMembers = team.filter((m) => m.type === "board");
  const staff = team.filter((m) => m.type === "staff");

  return (
    <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 md:px-12 lg:px-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-4">
            OUR <span className="text-[#FACC15]">TEAM</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-12 sm:mb-16 max-w-3xl">
            Meet the passionate individuals dedicated to creating lasting change in communities around the world.
          </p>
        </ScrollReveal>

        {/* Leadership Team */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 sm:mb-8">
            LEADERSHIP <span className="text-[#FACC15]">TEAM</span>
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {leadership.map((leader, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden hover:border-[#FACC15] transition-all group">
                <div className="grid sm:grid-cols-5 gap-0">
                  <div className="sm:col-span-2 relative h-56 sm:h-64 md:h-auto">
                    <ImageWithFallback
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="sm:col-span-3 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-[#FACC15] font-black uppercase text-xs sm:text-sm mb-3 sm:mb-4 tracking-wider">
                      {leader.role}
                    </p>
                    <p className="text-gray-400 mb-4 sm:mb-6 text-sm leading-relaxed">
                      {leader.bio}
                    </p>
                    <div className="flex gap-4">
                      <a href={`mailto:${leader.email}`} className="text-[#FACC15] hover:text-[#ffd700] transition-colors">
                        <Mail size={20} />
                      </a>
                      <a href={leader.linkedin} className="text-[#FACC15] hover:text-[#ffd700] transition-colors">
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Board of Directors */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 sm:mb-8">
            BOARD OF <span className="text-[#FACC15]">DIRECTORS</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {boardMembers.map((member, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden hover:border-[#FACC15] transition-all group hover:scale-105">
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-black text-white mb-1 text-xs sm:text-sm">
                    {member.name}
                  </h4>
                  <p className="text-[#FACC15] text-xs uppercase font-black">
                    {member.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Staff Members */}
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 sm:mb-8">
            CORE <span className="text-[#FACC15]">STAFF</span>
          </h2>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {staff.map((member, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-4 sm:p-6 hover:border-[#FACC15] transition-all group hover:scale-105">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FACC15] flex items-center justify-center font-black text-black text-xl sm:text-2xl flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-black text-white mb-1 text-sm sm:text-base">
                      {member.name}
                    </h4>
                    <p className="text-[#FACC15] text-xs sm:text-sm font-black uppercase mb-1">
                      {member.role}
                    </p>
                    <p className="text-gray-500 text-xs uppercase">
                      {member.department}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}