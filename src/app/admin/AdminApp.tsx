import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard, Settings, Users, Handshake, Quote, GraduationCap, BarChart3,
  Star, HeartHandshake, CalendarDays, Newspaper, Video, Image as ImageIcon, FileText,
  Award, Phone, CreditCard, Landmark, Inbox, LogOut, Plus, Pencil, Trash2,
} from "lucide-react";
import { api, getToken, setToken, clearToken } from "../../lib/api";
import { toast } from "sonner";

type FieldType = "text" | "textarea" | "number" | "select" | "checkbox" | "image";
interface Field { name: string; label: string; type: FieldType; options?: string[]; hint?: string; }
interface Section {
  key: string; label: string; icon: ReactNode; kind: "crud" | "single" | "settings" | "submissions";
  endpoint?: string; fields?: Field[]; keys?: string[];
}

const ICON_OPTIONS = ["Heart", "Users", "Lightbulb", "Target", "GraduationCap", "Stethoscope", "Accessibility", "Home", "Briefcase", "Apple", "CreditCard", "Building2", "Smartphone"];

const SECTIONS: Section[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, kind: "dashboard" },
  { key: "settings", label: "Site Settings", icon: <Settings size={18} />, kind: "settings", keys: ["site_name", "hero_title1", "hero_title2", "hero_subtitle", "hero_btn1", "hero_btn2", "about_mission", "about_vision", "donate_suggested_amounts"] },
  { key: "team", label: "Team", icon: <Users size={18} />, kind: "crud", endpoint: "team", fields: [
    { name: "type", label: "Type", type: "select", options: ["leadership", "board", "staff"] },
    { name: "name", label: "Name", type: "text" }, { name: "role", label: "Role", type: "text" },
    { name: "bio", label: "Bio", type: "textarea" }, { name: "image", label: "Image URL", type: "image" },
    { name: "email", label: "Email", type: "text" }, { name: "linkedin", label: "LinkedIn", type: "text" },
    { name: "department", label: "Department", type: "text" },
  ] },
  { key: "partners", label: "Partners", icon: <Handshake size={18} />, kind: "crud", endpoint: "partners", fields: [
    { name: "type", label: "Type", type: "select", options: ["corporate", "government", "ngo"] },
    { name: "name", label: "Name", type: "text" }, { name: "category", label: "Category / Label", type: "text" },
    { name: "since", label: "Since", type: "text" }, { name: "region", label: "Region", type: "text" },
  ] },
  { key: "testimonials", label: "Testimonials", icon: <Quote size={18} />, kind: "crud", endpoint: "testimonials", fields: [
    { name: "quote", label: "Quote", type: "textarea" }, { name: "author", label: "Author", type: "text" },
    { name: "organization", label: "Organization", type: "text" }, { name: "role", label: "Role", type: "text" },
  ] },
  { key: "programs", label: "Programs", icon: <GraduationCap size={18} />, kind: "crud", endpoint: "programs", fields: [
    { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
    { name: "title", label: "Title", type: "text" }, { name: "description", label: "Description", type: "textarea" },
    { name: "benefits", label: "Benefits (one per line)", type: "textarea" },
  ] },
  { key: "impact_stats", label: "Impact Stats", icon: <BarChart3 size={18} />, kind: "crud", endpoint: "impact_stats", fields: [
    { name: "number", label: "Number", type: "number" }, { name: "label", label: "Label", type: "text" },
    { name: "sublabel", label: "Sublabel", type: "text" }, { name: "suffix", label: "Suffix", type: "text" },
  ] },
  { key: "success_stories", label: "Success Stories", icon: <Star size={18} />, kind: "crud", endpoint: "success_stories", fields: [
    { name: "name", label: "Name", type: "text" }, { name: "story", label: "Story", type: "textarea" },
    { name: "program", label: "Program", type: "text" }, { name: "image", label: "Image URL", type: "image" },
  ] },
  { key: "volunteer_opportunities", label: "Volunteer Roles", icon: <HeartHandshake size={18} />, kind: "crud", endpoint: "volunteer_opportunities", fields: [
    { name: "title", label: "Title", type: "text" }, { name: "location", label: "Location", type: "text" },
    { name: "time", label: "Time", type: "text" }, { name: "spots", label: "Spots", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ] },
  { key: "volunteer_items", label: "Volunteer Info", icon: <HeartHandshake size={18} />, kind: "crud", endpoint: "volunteer_items", fields: [
    { name: "kind", label: "Kind", type: "select", options: ["requirement", "benefit"] },
    { name: "text", label: "Text", type: "textarea" },
  ] },
  { key: "upcoming_events", label: "Upcoming Events", icon: <CalendarDays size={18} />, kind: "crud", endpoint: "upcoming_events", fields: [
    { name: "title", label: "Title", type: "text" }, { name: "date", label: "Date", type: "text" },
    { name: "time", label: "Time", type: "text" }, { name: "location", label: "Location", type: "text" },
    { name: "attendees", label: "Attendees", type: "text" }, { name: "price", label: "Price", type: "text" },
    { name: "description", label: "Description", type: "textarea" }, { name: "image", label: "Image URL", type: "image" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ] },
  { key: "past_events", label: "Past Events", icon: <CalendarDays size={18} />, kind: "crud", endpoint: "past_events", fields: [
    { name: "title", label: "Title", type: "text" }, { name: "participants", label: "Participants", type: "text" },
    { name: "raised", label: "Raised", type: "text" },
  ] },
  { key: "news", label: "News", icon: <Newspaper size={18} />, kind: "crud", endpoint: "news", fields: [
    { name: "title", label: "Title", type: "text" }, { name: "excerpt", label: "Excerpt", type: "textarea" },
    { name: "date", label: "Date", type: "text" }, { name: "image", label: "Image URL", type: "image" },
    { name: "category", label: "Category", type: "text" },
  ] },
  { key: "media_videos", label: "Media Videos", icon: <Video size={18} />, kind: "crud", endpoint: "media_videos", fields: [
    { name: "section", label: "Section", type: "select", options: ["all", "impact", "programs", "events"] },
    { name: "title", label: "Title", type: "text" }, { name: "description", label: "Description", type: "textarea" },
    { name: "thumbnail", label: "Thumbnail URL", type: "image" }, { name: "duration", label: "Duration", type: "text" },
    { name: "category", label: "Category", type: "text" }, { name: "date", label: "Date", type: "text" },
    { name: "featured", label: "Featured", type: "checkbox" },
  ] },
  { key: "photo_galleries", label: "Photo Galleries", icon: <ImageIcon size={18} />, kind: "crud", endpoint: "photo_galleries", fields: [
    { name: "title", label: "Title", type: "text" }, { name: "count", label: "Count", type: "text" },
    { name: "cover", label: "Cover URL", type: "image" },
  ] },
  { key: "resources", label: "Resources", icon: <FileText size={18} />, kind: "crud", endpoint: "resources", fields: [
    { name: "category", label: "Category", type: "select", options: ["report", "brochure", "media", "form"] },
    { name: "title", label: "Title", type: "text" }, { name: "description", label: "Description", type: "textarea" },
    { name: "year", label: "Year", type: "text" }, { name: "size", label: "Size", type: "text" },
    { name: "downloads", label: "Downloads", type: "number" }, { name: "type", label: "Type", type: "text" },
  ] },
  { key: "about_values", label: "About Values", icon: <Award size={18} />, kind: "crud", endpoint: "about_values", fields: [
    { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
    { name: "title", label: "Title", type: "text" }, { name: "description", label: "Description", type: "textarea" },
  ] },
  { key: "about_stats", label: "About Stats", icon: <BarChart3 size={18} />, kind: "crud", endpoint: "about_stats", fields: [
    { name: "value", label: "Value", type: "text" }, { name: "label", label: "Label", type: "text" },
  ] },
  { key: "contact_info", label: "Contact Info", icon: <Phone size={18} />, kind: "single", endpoint: "contact_info", fields: [
    { name: "address", label: "Address", type: "textarea" }, { name: "phone1", label: "Phone 1", type: "text" },
    { name: "phone2", label: "Phone 2", type: "text" }, { name: "email1", label: "Email 1", type: "text" },
    { name: "email2", label: "Email 2", type: "text" }, { name: "hours_mon", label: "Hours (Mon-Fri)", type: "text" },
    { name: "hours_sat", label: "Hours (Sat)", type: "text" }, { name: "hours_sun", label: "Hours (Sun)", type: "text" },
    { name: "facebook", label: "Facebook URL", type: "text" }, { name: "twitter", label: "Twitter URL", type: "text" },
    { name: "instagram", label: "Instagram URL", type: "text" }, { name: "linkedin", label: "LinkedIn URL", type: "text" },
  ] },
  { key: "donate_stats", label: "Donate Stats", icon: <CreditCard size={18} />, kind: "crud", endpoint: "donate_stats", fields: [
    { name: "prefix", label: "Prefix", type: "text" }, { name: "number", label: "Number", type: "number" },
    { name: "suffix", label: "Suffix", type: "text" }, { name: "label", label: "Label", type: "text" },
  ] },
  { key: "donate_impact_examples", label: "Donate Impact", icon: <CreditCard size={18} />, kind: "crud", endpoint: "donate_impact_examples", fields: [
    { name: "amount", label: "Amount", type: "number" }, { name: "impact", label: "Impact", type: "textarea" },
  ] },
  { key: "donate_payment_methods", label: "Payment Methods", icon: <CreditCard size={18} />, kind: "crud", endpoint: "donate_payment_methods", fields: [
    { name: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
    { name: "name", label: "Name", type: "text" }, { name: "description", label: "Description", type: "text" },
  ] },
  { key: "donate_bank", label: "Bank Details", icon: <Landmark size={18} />, kind: "single", endpoint: "donate_bank", fields: [
    { name: "bank_name", label: "Bank Name", type: "text" }, { name: "account_name", label: "Account Name", type: "text" },
    { name: "account_number", label: "Account Number", type: "text" }, { name: "swift", label: "SWIFT", type: "text" },
    { name: "email", label: "Email", type: "text" },
  ] },
  { key: "submissions", label: "Submissions", icon: <Inbox size={18} />, kind: "submissions" },
];

function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const base = "w-full bg-black/60 border border-[#FACC15]/30 px-3 py-2 text-white text-sm outline-none focus:border-[#FACC15] rounded";
  if (field.type === "textarea") return <textarea rows={3} className={base + " resize-y"} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={field.label} />;
  if (field.type === "number") return <input type="number" className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />;
  if (field.type === "checkbox") return <input type="checkbox" className="w-5 h-5 accent-[#FACC15]" checked={!!value} onChange={(e) => onChange(e.target.checked ? 1 : 0)} />;
  if (field.type === "select") return (
    <select className={base} value={value || ""} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select...</option>
      {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
  return <input type="text" className={base} value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder={field.label} />;
}

function CrudSection({ section }: { section: Section }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any | null>(null);

  const load = () => {
    setLoading(true);
    api.get(section.endpoint!)
      .then((data) => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { toast.error("Failed to load"); setLoading(false); });
  };
  useEffect(load, [section.endpoint]);

  const save = async () => {
    try {
      if (form.id) await api.update(section.endpoint!, form.id, form);
      else await api.create(section.endpoint!, form);
      toast.success("Saved");
      setForm(null);
      load();
    } catch (e: any) { toast.error(e.message); }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try { await api.remove(section.endpoint!, id); toast.success("Deleted"); load(); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black uppercase">{section.label}</h2>
        <button onClick={() => setForm({})} className="bg-[#FACC15] text-black px-4 py-2 font-black text-sm uppercase flex items-center gap-2 hover:bg-[#ffd700] transition-all">
          <Plus size={16} /> Add New
        </button>
      </div>

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="overflow-x-auto border border-[#FACC15]/20">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1a1a] text-[#FACC15] uppercase text-xs">
              <tr>
                {section.fields!.slice(0, 4).map((f) => <th key={f.name} className="text-left p-3">{f.label}</th>)}
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-[#FACC15]/10">
                  {section.fields!.slice(0, 4).map((f) => (
                    <td key={f.name} className="p-3 text-gray-300 max-w-xs truncate">
                      {f.type === "checkbox" ? (item[f.name] ? "Yes" : "No") : String(item[f.name] ?? "")}
                    </td>
                  ))}
                  <td className="p-3 text-right whitespace-nowrap">
                    <button onClick={() => setForm({ ...item })} className="text-[#FACC15] hover:text-[#ffd700] mr-3"><Pencil size={16} /></button>
                    <button onClick={() => remove(item.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-gray-500">No items yet</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {form && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-6 overflow-y-auto">
          <div className="bg-[#0a0a0a] border border-[#FACC15]/30 w-full max-w-2xl my-8 p-6">
            <h3 className="text-2xl font-black uppercase mb-4 text-[#FACC15]">{form.id ? "Edit" : "New"} {section.label}</h3>
            <div className="grid gap-4 max-h-[70vh] overflow-y-auto pr-2">
              {section.fields!.map((f) => (
                <div key={f.name}>
                  <label className="block text-xs font-black uppercase tracking-wider mb-1 text-[#FACC15]">{f.label}</label>
                  <FieldInput field={f} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={save} className="bg-[#FACC15] text-black px-6 py-2 font-black uppercase text-sm hover:bg-[#ffd700] transition-all">Save</button>
              <button onClick={() => setForm(null)} className="border border-[#FACC15]/30 text-white px-6 py-2 font-black uppercase text-sm hover:border-[#FACC15] transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SingleSection({ section }: { section: Section }) {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(section.endpoint!).then((d) => { setForm(d || {}); setLoading(false); }).catch(() => setLoading(false));
  }, [section.endpoint]);
  const save = async () => {
    try { await api.update(section.endpoint!, form.id, form); toast.success("Saved"); }
    catch (e: any) { toast.error(e.message); }
  };
  return (
    <div>
      <h2 className="text-3xl font-black uppercase mb-6">{section.label}</h2>
      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid gap-4 max-w-2xl">
          {section.fields!.map((f) => (
            <div key={f.name}>
              <label className="block text-xs font-black uppercase tracking-wider mb-1 text-[#FACC15]">{f.label}</label>
              <FieldInput field={f} value={form[f.name]} onChange={(v) => setForm({ ...form, [f.name]: v })} />
            </div>
          ))}
          <button onClick={save} className="bg-[#FACC15] text-black px-6 py-2 font-black uppercase text-sm hover:bg-[#ffd700] transition-all w-fit mt-2">Save</button>
        </div>
      )}
    </div>
  );
}

function SettingsSection() {
  const keys = ["site_name", "hero_title1", "hero_title2", "hero_subtitle", "hero_btn1", "hero_btn2", "about_mission", "about_vision", "donate_suggested_amounts"];
  const labels: Record<string, string> = {
    site_name: "Site Name", hero_title1: "Hero Title 1", hero_title2: "Hero Title 2", hero_subtitle: "Hero Subtitle",
    hero_btn1: "Hero Button 1", hero_btn2: "Hero Button 2", about_mission: "About Mission", about_vision: "About Vision",
    donate_suggested_amounts: "Donate Suggested Amounts (comma separated)",
  };
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Promise.all(keys.map((k) => api.getSetting(k))).then((res) => {
      const v: Record<string, string> = {};
      res.forEach((r, i) => { v[keys[i]] = r.value || ""; });
      setValues(v); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  const save = async () => {
    try {
      for (const k of keys) await api.setSetting(k, values[k]);
      toast.success("Settings saved");
    } catch (e: any) { toast.error(e.message); }
  };
  return (
    <div>
      <h2 className="text-3xl font-black uppercase mb-6">Site Settings</h2>
      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="grid gap-4 max-w-2xl">
          {keys.map((k) => (
            <div key={k}>
              <label className="block text-xs font-black uppercase tracking-wider mb-1 text-[#FACC15]">{labels[k]}</label>
              {k === "about_mission" || k === "about_vision" || k === "hero_subtitle" ? (
                <textarea rows={3} className="w-full bg-black/60 border border-[#FACC15]/30 px-3 py-2 text-white text-sm outline-none focus:border-[#FACC15] rounded" value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })} />
              ) : (
                <input type="text" className="w-full bg-black/60 border border-[#FACC15]/30 px-3 py-2 text-white text-sm outline-none focus:border-[#FACC15] rounded" value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })} />
              )}
            </div>
          ))}
          <button onClick={save} className="bg-[#FACC15] text-black px-6 py-2 font-black uppercase text-sm hover:bg-[#ffd700] transition-all w-fit mt-2">Save Settings</button>
        </div>
      )}
    </div>
  );
}

function SubmissionsSection() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  useEffect(() => {
    api.get("admin/contacts").then(setContacts).catch(() => {});
    api.get("admin/volunteers").then(setVolunteers).catch(() => {});
    api.get("admin/donations").then(setDonations).catch(() => {});
  }, []);
  const Table = ({ title, rows, cols }: { title: string; rows: any[]; cols: string[] }) => (
    <div className="mb-10">
      <h3 className="text-2xl font-black uppercase mb-3 text-[#FACC15]">{title} ({rows.length})</h3>
      <div className="overflow-x-auto border border-[#FACC15]/20">
        <table className="w-full text-sm">
          <thead className="bg-[#1a1a1a] text-[#FACC15] uppercase text-xs"><tr>{cols.map((c) => <th key={c} className="text-left p-3">{c}</th>)}</tr></thead>
          <tbody>
            {rows.map((r) => <tr key={r.id} className="border-t border-[#FACC15]/10">{cols.map((c) => <td key={c} className="p-3 text-gray-300">{String(r[c] ?? "")}</td>)}</tr>)}
            {rows.length === 0 && <tr><td colSpan={cols.length} className="p-4 text-center text-gray-500">No submissions yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
  return (
    <div>
      <h2 className="text-3xl font-black uppercase mb-6">Form Submissions</h2>
      <Table title="Contact Messages" rows={contacts} cols={["name", "email", "phone", "message", "created_at"]} />
      <Table title="Volunteer Applications" rows={volunteers} cols={["name", "email", "phone", "opportunity", "created_at"]} />
      <Table title="Donations" rows={donations} cols={["donation_type", "amount", "first_name", "last_name", "email", "created_at"]} />
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const submit = async () => {
    try { const { token } = await api.login(pw); setToken(token); onLogin(); }
    catch (e: any) { setErr(e.message || "Invalid password"); }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#0a0a0a] border border-[#FACC15]/30 p-8 w-full max-w-sm">
        <div className="text-3xl font-black text-[#FACC15] mb-1">SAO</div>
        <p className="text-gray-400 text-sm mb-6">Admin Login</p>
        <input type="password" className="w-full bg-black border border-[#FACC15]/30 px-3 py-3 text-white outline-none focus:border-[#FACC15] mb-4" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submit()} />
        {err && <p className="text-red-400 text-sm mb-3">{err}</p>}
        <button onClick={submit} className="w-full bg-[#FACC15] text-black py-3 font-black uppercase text-sm hover:bg-[#ffd700] transition-all">Login</button>
        <p className="text-gray-600 text-xs mt-4">Default password: admin123</p>
      </div>
    </div>
  );
}

export function AdminApp() {
  const [authed, setAuthed] = useState(!!getToken());
  const [active, setActive] = useState("dashboard");

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  const section = SECTIONS.find((s) => s.key === active) || SECTIONS[0];

  return (
    <div className="min-h-screen bg-black text-white flex">
      <aside className="w-64 bg-[#0a0a0a] border-r border-[#FACC15]/20 p-4 fixed h-full overflow-y-auto">
        <div className="text-2xl font-black text-[#FACC15] mb-6">SAO ADMIN</div>
        <nav className="space-y-1">
          {SECTIONS.map((s) => (
            <button key={s.key} onClick={() => setActive(s.key)} className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-black uppercase tracking-wide transition-all ${active === s.key ? "bg-[#FACC15] text-black" : "text-gray-300 hover:bg-[#1a1a1a] hover:text-[#FACC15]"}`}>
              {s.icon} {s.label}
            </button>
          ))}
        </nav>
        <button onClick={() => { clearToken(); setAuthed(false); }} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-black uppercase tracking-wide text-red-400 hover:bg-[#1a1a1a] mt-6">
          <LogOut size={18} /> Logout
        </button>
        <a href="/" className="block mt-2 px-3 py-2 text-sm text-gray-500 hover:text-[#FACC15]">← Back to Site</a>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {section.kind === "dashboard" && (
          <div>
            <h1 className="text-4xl font-black uppercase mb-4">Dashboard</h1>
            <p className="text-gray-400 mb-6">Manage all website content from the database. Changes appear live on the public site.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTIONS.filter((s) => s.kind !== "dashboard").map((s) => (
                <button key={s.key} onClick={() => setActive(s.key)} className="bg-[#1a1a1a] border border-[#FACC15]/20 p-6 text-left hover:border-[#FACC15] transition-all flex items-center gap-3">
                  <span className="text-[#FACC15]">{s.icon}</span>
                  <span className="font-black uppercase text-sm">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {section.kind === "crud" && <CrudSection section={section} />}
        {section.kind === "single" && <SingleSection section={section} />}
        {section.kind === "settings" && <SettingsSection />}
        {section.kind === "submissions" && <SubmissionsSection />}
      </main>
    </div>
  );
}
