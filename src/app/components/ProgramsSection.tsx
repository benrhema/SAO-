import { GraduationCap, Stethoscope, Home, Briefcase, Accessibility, Apple } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ScrollReveal } from "./ScrollReveal";
import { useContent } from "../../lib/content";
import { getIcon } from "../../lib/icons";

export function ProgramsSection() {
  const content = useContent();
  const programs = (content.programs && content.programs.length ? content.programs : [
    { icon: "GraduationCap", title: "EDUCATION ACCESS", description: "Providing free education, scholarships, and learning materials to underprivileged children and adults.", benefits: "Free tutoring\nSchool supplies\nScholarship programs\nAdult literacy classes" },
    { icon: "Stethoscope", title: "HEALTHCARE SUPPORT", description: "Offering medical care, mental health services, and health education to communities in need.", benefits: "Free medical clinics\nMental health counseling\nHealth awareness\nMedicine assistance" },
    { icon: "Accessibility", title: "DISABILITY SERVICES", description: "Supporting individuals with disabilities through assistive devices, therapy, and advocacy.", benefits: "Mobility aids\nPhysical therapy\nAssistive technology\nRights advocacy" },
    { icon: "Home", title: "HOUSING ASSISTANCE", description: "Helping families secure safe, affordable housing and providing home improvement support.", benefits: "Emergency shelter\nRent assistance\nHome repairs\nHousing counseling" },
    { icon: "Briefcase", title: "JOB TRAINING", description: "Empowering individuals with vocational training and employment opportunities.", benefits: "Skills training\nJob placement\nCareer counseling\nEntrepreneurship support" },
    { icon: "Apple", title: "FOOD SECURITY", description: "Ensuring access to nutritious food through food banks and community kitchens.", benefits: "Food distribution\nCommunity meals\nNutrition education\nAgricultural training" },
  ]);

  return (
    <section id="programs" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
            OUR <span className="text-[#FACC15]">PROGRAMS</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-3xl">
            We offer comprehensive programs designed to address the most pressing needs in our communities.
            Each initiative is crafted to create sustainable, long-term impact.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div 
                className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8 hover:border-[#FACC15] transition-all group hover:scale-105 h-full"
              >
                <div className="bg-[#FACC15] w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {(() => { const Icon = getIcon(program.icon); return <Icon className="text-black" size={32} />; })()}
                </div>
                
                <h3 className="text-2xl font-black mb-3 text-white">
                  {program.title}
                </h3>
                
                <p className="text-gray-400 mb-4">
                  {program.description}
                </p>
                
                <div className="space-y-2">
                  {((Array.isArray(program.benefits) ? program.benefits : (program.benefits || '').split('\n')).filter(Boolean)).map((benefit: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-[#FACC15]" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <button className="mt-6 text-[#FACC15] font-black uppercase text-sm tracking-wider hover:text-[#ffd700] transition-colors">
                  Learn More →
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Program Impact Banner */}
        <ScrollReveal>
          <div className="relative h-64 overflow-hidden mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBwcm9ncmFtJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzcwMjM1OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Our Programs in Action"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="text-center px-6">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                  MAKING <span className="text-[#FACC15]">REAL CHANGE</span>
                </h3>
                <p className="text-xl text-gray-300 max-w-2xl">
                  Every program is designed with measurable outcomes and sustainable impact in mind.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}