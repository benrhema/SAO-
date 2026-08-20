import { Heart, Users, Lightbulb, Target } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useContent } from "../../lib/content";
import { getIcon } from "../../lib/icons";

export function AboutSection() {
  const content = useContent();
  const s = content.settings || {};
  const values = (content.about_values && content.about_values.length
    ? content.about_values
    : [
        { icon: "Heart", title: "COMPASSION", description: "We believe in the power of empathy and understanding to transform lives." },
        { icon: "Users", title: "COMMUNITY", description: "Building stronger communities through collaboration and support." },
        { icon: "Lightbulb", title: "INNOVATION", description: "Finding creative solutions to tackle poverty and disability challenges." },
        { icon: "Target", title: "IMPACT", description: "Creating measurable, lasting change in the lives we touch." },
      ]);

  return (
    <section id="about" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">
            ABOUT <span className="text-[#FACC15]">US</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <ScrollReveal delay={0.2}>
            <div>
              <h3 className="text-3xl font-black text-[#FACC15] mb-4 uppercase">Our Mission</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {s.about_mission || "Smile Again Foundation is dedicated to empowering individuals with disabilities and those living in poverty. We provide essential resources, education, healthcare, and sustainable development opportunities to help people overcome barriers and build better futures."}
              </p>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <div>
              <h3 className="text-3xl font-black text-[#FACC15] mb-4 uppercase">Our Vision</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                {s.about_vision || "We envision a world where everyone, regardless of their circumstances, has access to the resources and support they need to thrive. Through our programs, we aim to create lasting positive change in communities across the globe."}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-4xl font-black uppercase mb-8">
              OUR <span className="text-[#FACC15]">VALUES</span>
            </h3>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = getIcon(value.icon);
              return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <div 
                  className="bg-[#1a1a1a] p-6 border border-[#FACC15]/20 hover:border-[#FACC15] transition-all group hover:scale-105 h-full"
                >
                  <Icon 
                    className="text-[#FACC15] mb-4 group-hover:scale-110 transition-transform" 
                    size={40} 
                  />
                  <h4 className="text-xl font-black mb-2 text-white">{value.title}</h4>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              </ScrollReveal>
            );
            })}
          </div>
        </div>

        <ScrollReveal>
          <div className="bg-[#FACC15] p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-black">
              {(content.about_stats && content.about_stats.length ? content.about_stats : [
                { value: "10K+", label: "Lives Impacted" },
                { value: "50+", label: "Programs" },
                { value: "25+", label: "Countries" },
              ]).map((stat, i) => (
                <div className="text-center" key={i}>
                  <div className="text-5xl md:text-6xl font-black mb-2">{stat.value}</div>
                  <div className="text-lg font-black uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}