import { Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { CounterAnimation } from "./CounterAnimation";
import { ScrollReveal } from "./ScrollReveal";
import { useContent } from "../../lib/content";

export function ImpactSection() {
  const content = useContent();
  const stories = content.success_stories && content.success_stories.length ? content.success_stories : [
    {
      name: "Maria Rodriguez",
      story: "After losing my job during the pandemic, Smile Again Foundation helped me get back on my feet. They provided job training and connected me with a great employer. Now I can support my family again.",
      program: "Job Training Program",
      image: "https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMHN1Y2Nlc3MlMjBzdG9yeXxlbnwxfHx8fDE3NzAyMzU5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "James Thompson",
      story: "The wheelchair and accessibility modifications they provided changed my life completely. I can now move independently and participate fully in my community. I'm forever grateful.",
      program: "Disability Services",
      image: "https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMHN1Y2Nlc3MlMjBzdG9yeXxlbnwxfHx8fDE3NzAyMzU5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Sarah Chen",
      story: "My daughter received a full scholarship through their education program. She's now the first person in our family to attend university. This foundation gave us hope for a better future.",
      program: "Education Access",
      image: "https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbiUyMHN1Y2Nlc3MlMjBzdG9yeXxlbnwxfHx8fDE3NzAyMzU5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const impactStats = content.impact_stats && content.impact_stats.length ? content.impact_stats : [
    { number: 50000, label: "MEALS SERVED", sublabel: "In the last year", suffix: "+" },
    { number: 2500, label: "PEOPLE TRAINED", sublabel: "New job skills acquired", suffix: "+" },
    { number: 1200, label: "CHILDREN EDUCATED", sublabel: "Scholarships provided", suffix: "+" },
    { number: 800, label: "MEDICAL VISITS", sublabel: "Free healthcare provided", suffix: "+" },
    { number: 350, label: "MOBILITY AIDS", sublabel: "Wheelchairs & devices", suffix: "+" },
    { number: 95, label: "SUCCESS RATE", sublabel: "Program completion", suffix: "%" }
  ];

  return (
    <section id="impact" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
            OUR <span className="text-[#FACC15]">IMPACT</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-3xl">
            Real stories from real people whose lives have been transformed through our programs.
          </p>
        </ScrollReveal>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {impactStats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div 
                className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 text-center hover:border-[#FACC15] transition-all hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-black text-[#FACC15] mb-2">
                  <CounterAnimation 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={2500}
                  />
                </div>
                <div className="text-white font-black text-xs uppercase mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-500 text-xs">
                  {stat.sublabel}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-4xl font-black uppercase mb-8">
              SUCCESS <span className="text-[#FACC15]">STORIES</span>
            </h3>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <ScrollReveal key={index} delay={index * 0.2}>
                <div 
                  className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8 hover:border-[#FACC15] transition-all group h-full"
                >
                  <Quote className="text-[#FACC15] mb-4 group-hover:scale-110 transition-transform" size={40} />
                  
                  <p className="text-gray-300 mb-6 italic leading-relaxed">
                    "{story.story}"
                  </p>
                  
                  <div className="border-t border-[#FACC15]/20 pt-4">
                    <div className="font-black text-white text-lg">
                      {story.name}
                    </div>
                    <div className="text-[#FACC15] text-sm font-black uppercase tracking-wider">
                      {story.program}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Video/Image Showcase */}
        <ScrollReveal>
          <div className="bg-[#FACC15] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl font-black uppercase mb-4 text-black">
                  SEE THE CHANGE
                </h3>
                <p className="text-black mb-6 text-lg">
                  Watch how your contributions are making a real difference in communities around the world. 
                  Every donation creates ripples of positive change.
                </p>
                <button className="bg-black text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#1a1a1a] transition-all">
                  Watch Our Story
                </button>
              </div>
              
              <div className="relative h-80">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwdm9sdW50ZWVycyUyMGdyb3VwJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzcwMjM1OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Our Team Making Impact"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all cursor-pointer">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#FACC15] border-b-[12px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}