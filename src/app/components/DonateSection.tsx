import { DollarSign, Heart, CreditCard } from "lucide-react";

export function DonateSection() {
  const donationAmounts = [25, 50, 100, 250, 500, 1000];

  return (
    <section id="donate" className="min-h-screen px-6 md:px-32 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">
            MAKE A <span className="text-[#FACC15]">DIFFERENCE</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your contribution directly impacts lives. Every donation helps us provide essential 
            services to those who need it most.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#1a1a1a] p-8 border border-[#FACC15]/20 hover:border-[#FACC15] transition-all text-center">
            <Heart className="text-[#FACC15] mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-black mb-3 text-white">ONE-TIME</h3>
            <p className="text-gray-400 text-sm">
              Make a single donation to support our immediate needs and current programs.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-8 border border-[#FACC15]/20 hover:border-[#FACC15] transition-all text-center">
            <DollarSign className="text-[#FACC15] mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-black mb-3 text-white">MONTHLY</h3>
            <p className="text-gray-400 text-sm">
              Become a sustaining supporter with recurring monthly donations.
            </p>
          </div>

          <div className="bg-[#1a1a1a] p-8 border border-[#FACC15]/20 hover:border-[#FACC15] transition-all text-center">
            <CreditCard className="text-[#FACC15] mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-black mb-3 text-white">CORPORATE</h3>
            <p className="text-gray-400 text-sm">
              Partner with us as a corporate sponsor to maximize your impact.
            </p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-8 md:p-12 border border-[#FACC15]/20">
          <h3 className="text-3xl font-black mb-6 uppercase text-center">
            SELECT YOUR <span className="text-[#FACC15]">CONTRIBUTION</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {donationAmounts.map((amount) => (
              <button
                key={amount}
                className="bg-black border-2 border-[#FACC15]/30 text-white p-6 font-black text-2xl hover:bg-[#FACC15] hover:text-black hover:border-[#FACC15] transition-all hover:scale-105"
              >
                ${amount}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-black uppercase tracking-wider mb-2 text-[#FACC15]">
              Custom Amount
            </label>
            <div className="flex items-center bg-black border border-[#FACC15]/30 p-4">
              <span className="text-2xl font-black text-[#FACC15] mr-2">$</span>
              <input
                type="number"
                placeholder="Enter amount"
                className="bg-transparent flex-1 text-2xl font-black text-white outline-none"
              />
            </div>
          </div>

          <button className="w-full bg-[#FACC15] text-black py-5 font-black uppercase text-lg tracking-widest hover:bg-[#ffd700] transition-all hover:scale-[1.02]">
            Donate Now
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            🔒 Secure payment processing. Your information is safe with us.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-[#FACC15] text-5xl font-black mb-2">$25</div>
            <div className="text-white font-black uppercase mb-2">Provides</div>
            <div className="text-gray-400 text-sm">School supplies for 5 children</div>
          </div>
          <div className="text-center">
            <div className="text-[#FACC15] text-5xl font-black mb-2">$100</div>
            <div className="text-white font-black uppercase mb-2">Provides</div>
            <div className="text-gray-400 text-sm">Healthcare for a family for 1 month</div>
          </div>
          <div className="text-center">
            <div className="text-[#FACC15] text-5xl font-black mb-2">$500</div>
            <div className="text-white font-black uppercase mb-2">Provides</div>
            <div className="text-gray-400 text-sm">Mobility aid for person with disability</div>
          </div>
        </div>
      </div>
    </section>
  );
}
