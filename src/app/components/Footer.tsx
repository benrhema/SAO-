import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#FACC15]/20 px-6 md:px-32 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-3xl font-black text-[#FACC15] tracking-tighter mb-4">
              SAO
            </div>
            <p className="text-gray-400 text-sm">
              Empowering communities through compassion, innovation, and sustainable development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-black uppercase mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-[#FACC15] transition-colors">Home</Link></li>
              <li><Link to="/team" className="hover:text-[#FACC15] transition-colors">Our Team</Link></li>
              <li><Link to="/partners" className="hover:text-[#FACC15] transition-colors">Our Partners</Link></li>
              <li><Link to="/media" className="hover:text-[#FACC15] transition-colors">Media Gallery</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-black uppercase mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/resources" className="hover:text-[#FACC15] transition-colors">Downloads</Link></li>
              <li><a href="/#news" className="hover:text-[#FACC15] transition-colors">Latest News</a></li>
              <li><a href="/#impact" className="hover:text-[#FACC15] transition-colors">Impact Stories</a></li>
              <li><a href="/#contact" className="hover:text-[#FACC15] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-black uppercase mb-4 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates and stories from the field.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#1a1a1a] border border-[#FACC15]/30 px-3 py-2 text-white text-sm outline-none focus:border-[#FACC15] transition-colors"
              />
              <button className="bg-[#FACC15] text-black px-4 py-2 font-black text-sm hover:bg-[#ffd700] transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FACC15]/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Smile Again Organization. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            Made with <Heart className="text-[#FACC15]" size={16} fill="#FACC15" /> by B.Rhema
          </div>
        </div>
      </div>
    </footer>
  );
}