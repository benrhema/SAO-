import { Heart, CreditCard, Building2, Smartphone, DollarSign } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { CounterAnimation } from "../components/CounterAnimation";
import { useState } from "react";
import { toast } from "sonner";
import { useContent } from "../../lib/content";
import { api } from "../../lib/api";
import { getIcon } from "../../lib/icons";

export function DonatePage() {
  const content = useContent();
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [sending, setSending] = useState(false);

  const suggestedAmounts = content.donate_suggested_amounts && content.donate_suggested_amounts.length ? content.donate_suggested_amounts : [25, 50, 100, 250, 500, 1000];
  const impactExamples = content.donate_impact_examples && content.donate_impact_examples.length ? content.donate_impact_examples : [];
  const paymentMethods = content.donate_payment_methods && content.donate_payment_methods.length ? content.donate_payment_methods : [];
  const donateStats = content.donate_stats && content.donate_stats.length ? content.donate_stats : [];
  const bank = content.donate_bank || {};

  const handleDonate = async () => {
    const finalAmount = amount ?? Number(customAmount);
    if (!finalAmount) {
      toast.error("Please select or enter an amount");
      return;
    }
    setSending(true);
    try {
      await api.donation({ donation_type: donationType, amount: finalAmount, payment_method: "" });
      toast.success("Thank you for your donation!");
      setCustomAmount("");
      setAmount(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to process donation");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 md:px-12 lg:px-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase mb-4">
            MAKE A <span className="text-[#FACC15]">DONATION</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-16 max-w-3xl">
            Your generous contribution helps us empower communities, provide essential services, 
            and create lasting change for those who need it most.
          </p>
        </ScrollReveal>

        {/* Impact Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {donateStats.map((stat: any, i: number) => (
              <div className="bg-[#FACC15] p-6 md:p-8 text-center" key={i}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2">
                  {stat.prefix}
                  <CounterAnimation end={stat.number} suffix={stat.suffix} duration={2500} />
                </div>
                <div className="text-black font-black uppercase text-xs tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Donation Form */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-black uppercase mb-6">
                  DONATION <span className="text-[#FACC15]">DETAILS</span>
                </h2>

                {/* Donation Type */}
                <div className="mb-8">
                  <label className="text-sm font-black uppercase tracking-wider mb-3 block">
                    Donation Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDonationType("one-time")}
                      className={`py-4 px-6 font-black uppercase text-sm tracking-wider transition-all ${
                        donationType === "one-time"
                          ? "bg-[#FACC15] text-black"
                          : "bg-[#0a0a0a] border border-[#FACC15]/20 text-white hover:border-[#FACC15]"
                      }`}
                    >
                      One-Time
                    </button>
                    <button
                      onClick={() => setDonationType("monthly")}
                      className={`py-4 px-6 font-black uppercase text-sm tracking-wider transition-all ${
                        donationType === "monthly"
                          ? "bg-[#FACC15] text-black"
                          : "bg-[#0a0a0a] border border-[#FACC15]/20 text-white hover:border-[#FACC15]"
                      }`}
                    >
                      Monthly
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="text-sm font-black uppercase tracking-wider mb-3 block">
                    Select Amount (USD)
                  </label>
                  <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
                    {suggestedAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount("");
                        }}
                        className={`py-4 px-4 font-black text-base md:text-lg transition-all ${
                          amount === amt
                            ? "bg-[#FACC15] text-black"
                            : "bg-[#0a0a0a] border border-[#FACC15]/20 text-white hover:border-[#FACC15]"
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(null);
                      }}
                      className="w-full bg-[#0a0a0a] border border-[#FACC15]/30 px-4 pl-12 py-4 text-white outline-none focus:border-[#FACC15] transition-colors"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="mb-8">
                  <label className="text-sm font-black uppercase tracking-wider mb-3 block">
                    Your Information
                  </label>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="bg-[#0a0a0a] border border-[#FACC15]/30 px-4 py-3 text-white outline-none focus:border-[#FACC15] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="bg-[#0a0a0a] border border-[#FACC15]/30 px-4 py-3 text-white outline-none focus:border-[#FACC15] transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-[#0a0a0a] border border-[#FACC15]/30 px-4 py-3 text-white outline-none focus:border-[#FACC15] transition-colors mb-4"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    className="w-full bg-[#0a0a0a] border border-[#FACC15]/30 px-4 py-3 text-white outline-none focus:border-[#FACC15] transition-colors"
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <label className="text-sm font-black uppercase tracking-wider mb-3 block">
                    Payment Method
                  </label>
                  <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = getIcon(method.icon);
                    return (
                    <button
                      key={method.name}
                      className="w-full bg-[#0a0a0a] border border-[#FACC15]/20 p-4 hover:border-[#FACC15] transition-all flex items-center gap-4 text-left"
                    >
                      <Icon className="text-[#FACC15]" size={24} />
                        <div>
                          <div className="font-black text-white">{method.name}</div>
                          <div className="text-sm text-gray-400">{method.description}</div>
                        </div>
                      </button>
                    );
                  })}
                  </div>
                </div>

                <button onClick={handleDonate} disabled={sending} className="w-full bg-[#FACC15] text-black py-4 font-black uppercase text-sm tracking-widest hover:bg-[#ffd700] transition-all disabled:opacity-60">
                  {sending ? "Processing..." : "Complete Donation"}
                </button>

                <p className="text-gray-500 text-xs mt-4 text-center">
                  All transactions are secure and encrypted. Your donation is tax-deductible.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Impact & Info Sidebar */}
          <div className="space-y-6">
            {/* Your Impact */}
            <ScrollReveal delay={0.2}>
              <div className="bg-[#FACC15] p-6 md:p-8">
                <Heart className="text-black mb-4" size={40} />
                <h3 className="text-2xl font-black uppercase mb-4 text-black">
                  YOUR IMPACT
                </h3>
                <div className="space-y-3">
                  {impactExamples.slice(0, 4).map((example) => (
                    <div key={example.amount} className="border-b border-black/20 pb-3 last:border-0">
                      <div className="font-black text-black">${example.amount}</div>
                      <div className="text-sm text-black/80">{example.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Why Donate */}
            <ScrollReveal delay={0.3}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 md:p-8">
                <h3 className="text-xl font-black uppercase mb-4">
                  WHY <span className="text-[#FACC15]">DONATE?</span>
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#FACC15] mt-1.5 flex-shrink-0" />
                    <span>98% of donations go directly to programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#FACC15] mt-1.5 flex-shrink-0" />
                    <span>Tax-deductible receipts provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#FACC15] mt-1.5 flex-shrink-0" />
                    <span>Transparent reporting on fund usage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#FACC15] mt-1.5 flex-shrink-0" />
                    <span>Regular updates on impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-[#FACC15] mt-1.5 flex-shrink-0" />
                    <span>Secure encrypted transactions</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Other Ways to Give */}
            <ScrollReveal delay={0.4}>
              <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 md:p-8">
                <h3 className="text-xl font-black uppercase mb-4">
                  OTHER WAYS TO <span className="text-[#FACC15]">GIVE</span>
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Corporate Matching</li>
                  <li>• Legacy Giving</li>
                  <li>• Stock Donations</li>
                  <li>• In-Kind Donations</li>
                  <li>• Fundraise for Us</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bank Details (Alternative) */}
        <ScrollReveal>
          <div className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-black uppercase mb-6">
              BANK TRANSFER <span className="text-[#FACC15]">DETAILS</span>
            </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Bank Name</div>
                  <div className="font-black text-white">{bank.bank_name || "ABC Bank"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Account Name</div>
                  <div className="font-black text-white">{bank.account_name || "Smile Again Organization"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">Account Number</div>
                  <div className="font-black text-white">{bank.account_number || "1234567890"}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase mb-1">SWIFT Code</div>
                  <div className="font-black text-white">{bank.swift || "ABCXXX123"}</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-6">
                Please send a confirmation email to <span className="text-[#FACC15]">{bank.email || "donations@sao.org"}</span> after making a bank transfer.
              </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
