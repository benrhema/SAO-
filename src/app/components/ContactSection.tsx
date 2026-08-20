import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useContent } from "../../lib/content";
import { api } from "../../lib/api";

export function ContactSection() {
  const content = useContent();
  const c = content.contact_info || {};
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.contact(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
          GET IN <span className="text-[#FACC15]">TOUCH</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
          Have questions or want to get involved? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#1a1a1a] p-8 border border-[#FACC15]/20">
            <h3 className="text-2xl font-black uppercase mb-6">SEND US A MESSAGE</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-black uppercase tracking-wider mb-2 text-[#FACC15]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-black border border-[#FACC15]/30 p-4 text-white outline-none focus:border-[#FACC15] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-wider mb-2 text-[#FACC15]">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-black border border-[#FACC15]/30 p-4 text-white outline-none focus:border-[#FACC15] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-wider mb-2 text-[#FACC15]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full bg-black border border-[#FACC15]/30 p-4 text-white outline-none focus:border-[#FACC15] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-wider mb-2 text-[#FACC15]">
                  Message
                </label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help..."
                  className="w-full bg-black border border-[#FACC15]/30 p-4 text-white outline-none focus:border-[#FACC15] transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={sending}
                className="w-full bg-[#FACC15] text-black py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-black uppercase mb-6">CONTACT INFO</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#FACC15] p-3">
                    <MapPin className="text-black" size={24} />
                  </div>
                  <div>
                    <div className="font-black text-white mb-1">ADDRESS</div>
                    <div className="text-gray-400">
                      {(c.address || "123 Hope Street\nCommunity Center, Suite 456\nNew York, NY 10001").split("\n").map((line: string, i: number) => (<div key={i}>{line}</div>))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FACC15] p-3">
                    <Phone className="text-black" size={24} />
                  </div>
                  <div>
                    <div className="font-black text-white mb-1">PHONE</div>
                    <div className="text-gray-400">
                      {c.phone1 || "+1 (555) 123-4567"}<br />
                      {c.phone2 || "+1 (555) 987-6543"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#FACC15] p-3">
                    <Mail className="text-black" size={24} />
                  </div>
                  <div>
                    <div className="font-black text-white mb-1">EMAIL</div>
                    <div className="text-gray-400">
                      {c.email1 || "info@smileagain.org"}<br />
                      {c.email2 || "support@smileagain.org"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-8 border border-[#FACC15]/20">
              <h3 className="text-2xl font-black uppercase mb-4">FOLLOW US</h3>
              <p className="text-gray-400 mb-6">
                Stay connected with our community on social media
              </p>
              
              <div className="flex gap-4">
                <button className="bg-black border border-[#FACC15]/30 p-4 hover:bg-[#FACC15] hover:border-[#FACC15] transition-all group">
                  <Facebook className="text-[#FACC15] group-hover:text-black" size={24} />
                </button>
                <button className="bg-black border border-[#FACC15]/30 p-4 hover:bg-[#FACC15] hover:border-[#FACC15] transition-all group">
                  <Twitter className="text-[#FACC15] group-hover:text-black" size={24} />
                </button>
                <button className="bg-black border border-[#FACC15]/30 p-4 hover:bg-[#FACC15] hover:border-[#FACC15] transition-all group">
                  <Instagram className="text-[#FACC15] group-hover:text-black" size={24} />
                </button>
                <button className="bg-black border border-[#FACC15]/30 p-4 hover:bg-[#FACC15] hover:border-[#FACC15] transition-all group">
                  <Linkedin className="text-[#FACC15] group-hover:text-black" size={24} />
                </button>
              </div>
            </div>

            <div className="mt-8 bg-[#FACC15] p-8">
              <h3 className="text-2xl font-black uppercase mb-2 text-black">OFFICE HOURS</h3>
                <div className="text-black">
                 <div className="mb-2">
                   <span className="font-black">Monday - Friday:</span> {c.hours_mon || "9:00 AM - 6:00 PM"}
                 </div>
                 <div className="mb-2">
                   <span className="font-black">Saturday:</span> {c.hours_sat || "10:00 AM - 4:00 PM"}
                 </div>
                 <div>
                   <span className="font-black">Sunday:</span> {c.hours_sun || "Closed"}
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
