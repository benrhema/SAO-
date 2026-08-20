import { Calendar, MapPin, Clock, Users, Ticket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useContent } from "../../lib/content";

export function EventsSection() {
  const content = useContent();
  const upcomingEvents = content.upcoming_events && content.upcoming_events.length ? content.upcoming_events : [];
  const pastEvents = content.past_events && content.past_events.length ? content.past_events : [];

  return (
    <section id="events" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
          UPCOMING <span className="text-[#FACC15]">EVENTS</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-3xl">
          Join us at our events to support our cause, meet our community, and make a lasting impact.
        </p>

        {/* Featured Event */}
        {upcomingEvents
          .filter(event => event.featured)
          .map((event, index) => (
            <div 
              key={index}
              className="bg-[#FACC15] mb-12 overflow-hidden grid md:grid-cols-2 gap-0"
            >
              <div className="relative h-96 md:h-auto">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-black text-[#FACC15] px-4 py-2 font-black uppercase text-xs tracking-wider">
                    Featured Event
                  </span>
                </div>
              </div>
              
              <div className="p-8 md:p-12 bg-[#FACC15]">
                <h3 className="text-4xl font-black uppercase mb-4 text-black">
                  {event.title}
                </h3>
                
                <p className="text-black mb-6 text-lg">
                  {event.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-black">
                    <Calendar className="flex-shrink-0" size={20} />
                    <span className="font-black">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-black">
                    <Clock className="flex-shrink-0" size={20} />
                    <span className="font-black">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-black">
                    <MapPin className="flex-shrink-0" size={20} />
                    <span className="font-black">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-black">
                    <Users className="flex-shrink-0" size={20} />
                    <span className="font-black">{event.attendees}</span>
                  </div>
                  <div className="flex items-center gap-3 text-black">
                    <Ticket className="flex-shrink-0" size={20} />
                    <span className="font-black">{event.price}</span>
                  </div>
                </div>
                
                <button className="bg-black text-[#FACC15] px-8 py-4 font-black uppercase text-sm tracking-widest hover:bg-[#1a1a1a] transition-all w-full md:w-auto">
                  Register Now
                </button>
              </div>
            </div>
          ))}

        {/* Other Upcoming Events */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {upcomingEvents
            .filter(event => !event.featured)
            .map((event, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a] border border-[#FACC15]/20 overflow-hidden hover:border-[#FACC15] transition-all group hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 font-black text-xs uppercase ${
                      event.price === "FREE" || event.price === "FREE for Students"
                        ? "bg-[#FACC15] text-black"
                        : "bg-black text-[#FACC15]"
                    }`}>
                      {event.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-2xl font-black mb-3 text-white group-hover:text-[#FACC15] transition-colors">
                    {event.title}
                  </h4>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={14} className="text-[#FACC15]" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock size={14} className="text-[#FACC15]" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={14} className="text-[#FACC15]" />
                      {event.location}
                    </div>
                  </div>
                  
                  <button className="w-full bg-[#FACC15] text-black py-3 font-black uppercase text-xs tracking-widest hover:bg-[#ffd700] transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Past Events */}
        <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-8 md:p-12">
          <h3 className="text-3xl font-black uppercase mb-8">
            PAST <span className="text-[#FACC15]">EVENT HIGHLIGHTS</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="text-center">
                <h4 className="text-xl font-black text-white mb-4">
                  {event.title}
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-3xl font-black text-[#FACC15]">
                      {event.participants}
                    </div>
                    <div className="text-gray-400 text-sm uppercase">
                      Participants
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-[#FACC15]">
                      {event.raised}
                    </div>
                    <div className="text-gray-400 text-sm uppercase">
                      Raised
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
