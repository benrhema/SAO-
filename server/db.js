const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = path.resolve(__dirname, 'data.sqlite');
const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------
db.exec(`
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT DEFAULT 'leadership',
  name TEXT, role TEXT, bio TEXT, image TEXT,
  email TEXT, linkedin TEXT, department TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT DEFAULT 'corporate',
  name TEXT, category TEXT, since TEXT, region TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote TEXT, author TEXT, organization TEXT, role TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS programs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT, title TEXT, description TEXT, benefits TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS impact_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number INTEGER, label TEXT, sublabel TEXT, suffix TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS success_stories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, story TEXT, program TEXT, image TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS volunteer_opportunities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, location TEXT, time TEXT, spots TEXT, description TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS volunteer_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT DEFAULT 'requirement',
  text TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS upcoming_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, date TEXT, time TEXT, location TEXT, attendees TEXT,
  price TEXT, description TEXT, image TEXT, featured INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS past_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, participants TEXT, raised TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, excerpt TEXT, date TEXT, image TEXT, category TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS media_videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT DEFAULT 'all',
  title TEXT, description TEXT, thumbnail TEXT, duration TEXT,
  category TEXT, date TEXT, featured INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS photo_galleries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT, count TEXT, cover TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS resources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT DEFAULT 'report',
  title TEXT, description TEXT, year TEXT, size TEXT,
  downloads INTEGER DEFAULT 0, type TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_values (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT, title TEXT, description TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS about_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  value TEXT, label TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_info (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  address TEXT, phone1 TEXT, phone2 TEXT, email1 TEXT, email2 TEXT,
  hours_mon TEXT, hours_sat TEXT, hours_sun TEXT,
  facebook TEXT, twitter TEXT, instagram TEXT, linkedin TEXT
);

CREATE TABLE IF NOT EXISTS donate_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  prefix TEXT, number INTEGER, suffix TEXT, label TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS donate_impact_examples (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount INTEGER, impact TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS donate_payment_methods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  icon TEXT, name TEXT, description TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS donate_bank (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bank_name TEXT, account_name TEXT, account_number TEXT, swift TEXT, email TEXT
);

CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT, phone TEXT, message TEXT, created_at TEXT
);

CREATE TABLE IF NOT EXISTS volunteer_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT, email TEXT, phone TEXT, opportunity TEXT, message TEXT, created_at TEXT
);

CREATE TABLE IF NOT EXISTS donations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  donation_type TEXT, amount REAL, first_name TEXT, last_name TEXT,
  email TEXT, phone TEXT, payment_method TEXT, created_at TEXT
);
`);

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------
function seeded() {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('seeded');
  return row && row.value === '1';
}

function setSetting(key, value) {
  db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run(key, value);
}

function bulkInsert(table, columns, rows) {
  const placeholders = columns.map(() => '?').join(', ');
  const stmt = db.prepare(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`);
  for (const item of rows) {
    stmt.run(...columns.map((c) => item[c]));
  }
}

if (!seeded()) {
  setSetting('site_name', 'Smile Again Organization');
  setSetting('hero_title1', 'BE THE');
  setSetting('hero_title2', 'CHANGE');
  setSetting('hero_subtitle', 'Empowering communities through Education, Healthcare, and Sustainable Development.');
  setSetting('hero_btn1', 'Learn More');
  setSetting('hero_btn2', 'Our Mission');
  setSetting('about_mission', 'Smile Again Foundation is dedicated to empowering individuals with disabilities and those living in poverty. We provide essential resources, education, healthcare, and sustainable development opportunities to help people overcome barriers and build better futures.');
  setSetting('about_vision', 'We envision a world where everyone, regardless of their circumstances, has access to the resources and support they need to thrive. Through our programs, we aim to create lasting positive change in communities across the globe.');
  setSetting('donate_suggested_amounts', '25,50,100,250,500,1000');

  bulkInsert('team_members',
    ['type', 'name', 'role', 'bio', 'image', 'email', 'linkedin', 'department', 'sort_order'],
    [
      { type: 'leadership', name: 'Founder & President', role: 'Founder & President', bio: 'Leading SAO with passion and dedication to create lasting change in communities. With years of experience in social work and community development, our founder established SAO to address systemic challenges facing people with disabilities and those living in poverty.', image: '', email: 'founder@sao.org', linkedin: '#', department: '', sort_order: 0 },
      { type: 'leadership', name: 'Michael Chen', role: 'Executive Director', bio: 'Michael brings extensive experience in program development and community outreach, ensuring SAO\'s initiatives reach those who need them most.', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: 'michael@sao.org', linkedin: '#', department: '', sort_order: 1 },
      { type: 'leadership', name: 'Dr. Aisha Patel', role: 'Medical Director', bio: 'A passionate advocate for accessible healthcare, Dr. Patel oversees all health-related programs and medical partnerships.', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: 'aisha@sao.org', linkedin: '#', department: '', sort_order: 2 },
      { type: 'leadership', name: 'James Rodriguez', role: 'Director of Operations', bio: 'James ensures seamless coordination across all SAO programs, managing logistics, volunteers, and community partnerships.', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: 'james@sao.org', linkedin: '#', department: '', sort_order: 3 },
      { type: 'board', name: 'Patricia Williams', role: 'Board Chair', bio: '', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: '', linkedin: '', department: '', sort_order: 0 },
      { type: 'board', name: 'David Kim', role: 'Board Treasurer', bio: '', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: '', linkedin: '', department: '', sort_order: 1 },
      { type: 'board', name: 'Maria Santos', role: 'Board Secretary', bio: '', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: '', linkedin: '', department: '', sort_order: 2 },
      { type: 'board', name: 'Robert Johnson', role: 'Board Member', bio: '', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: '', linkedin: '', department: '', sort_order: 3 },
      { type: 'board', name: 'Lisa Anderson', role: 'Board Member', bio: '', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: '', linkedin: '', department: '', sort_order: 4 },
      { type: 'board', name: 'Ahmed Hassan', role: 'Board Member', bio: '', image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', email: '', linkedin: '', department: '', sort_order: 5 },
      { type: 'staff', name: 'Emily Martinez', role: 'Education Program Manager', bio: '', image: '', email: '', linkedin: '', department: 'Programs', sort_order: 0 },
      { type: 'staff', name: 'Kevin Nguyen', role: 'Healthcare Coordinator', bio: '', image: '', email: '', linkedin: '', department: 'Healthcare', sort_order: 1 },
      { type: 'staff', name: 'Sophie Thompson', role: 'Volunteer Coordinator', bio: '', image: '', email: '', linkedin: '', department: 'Community', sort_order: 2 },
      { type: 'staff', name: 'Marcus Williams', role: 'Communications Director', bio: '', image: '', email: '', linkedin: '', department: 'Communications', sort_order: 3 },
      { type: 'staff', name: 'Rachel Green', role: 'Fundraising Manager', bio: '', image: '', email: '', linkedin: '', department: 'Development', sort_order: 4 },
      { type: 'staff', name: 'Daniel Lee', role: 'IT & Data Manager', bio: '', image: '', email: '', linkedin: '', department: 'Operations', sort_order: 5 },
    ]);

  bulkInsert('partners',
    ['type', 'name', 'category', 'since', 'region', 'sort_order'],
    [
      { type: 'corporate', name: 'Global Health Initiative', category: 'Healthcare', since: '2020', region: '', sort_order: 0 },
      { type: 'corporate', name: 'TechForGood Foundation', category: 'Technology', since: '2019', region: '', sort_order: 1 },
      { type: 'corporate', name: 'Education First Alliance', category: 'Education', since: '2021', region: '', sort_order: 2 },
      { type: 'corporate', name: 'Sustainable Future Corp', category: 'Environment', since: '2022', region: '', sort_order: 3 },
      { type: 'corporate', name: 'Community Bank Group', category: 'Finance', since: '2018', region: '', sort_order: 4 },
      { type: 'corporate', name: 'Medical Supplies International', category: 'Healthcare', since: '2020', region: '', sort_order: 5 },
      { type: 'government', name: 'Ministry of Health', category: '', since: '', region: 'National', sort_order: 0 },
      { type: 'government', name: 'Department of Social Services', category: '', since: '', region: 'Regional', sort_order: 1 },
      { type: 'government', name: 'Education & Skills Authority', category: '', since: '', region: 'National', sort_order: 2 },
      { type: 'government', name: 'Disability Rights Commission', category: '', since: '', region: 'National', sort_order: 3 },
      { type: 'ngo', name: 'World Disability Alliance', category: 'International NGO', since: '', region: '', sort_order: 0 },
      { type: 'ngo', name: 'Poverty Action Network', category: 'Local NGO', since: '', region: '', sort_order: 1 },
      { type: 'ngo', name: 'Healthcare Without Borders', category: 'International NGO', since: '', region: '', sort_order: 2 },
      { type: 'ngo', name: 'Community Empowerment Initiative', category: 'Local NGO', since: '', region: '', sort_order: 3 },
      { type: 'ngo', name: 'Education for All Foundation', category: 'International NGO', since: '', region: '', sort_order: 4 },
      { type: 'ngo', name: 'Voices for Change', category: 'Advocacy Group', since: '', region: '', sort_order: 5 },
    ]);

  bulkInsert('testimonials',
    ['quote', 'author', 'organization', 'role', 'sort_order'],
    [
      { quote: 'Working with Smile Again Organization has been transformative. Their commitment to sustainable development aligns perfectly with our mission.', author: 'Jane Smith', organization: 'Global Health Initiative', role: 'Executive Director', sort_order: 0 },
      { quote: 'SAO\'s innovative approach to addressing poverty and disability challenges sets them apart. We\'re proud to support their vital work.', author: 'Michael Brown', organization: 'TechForGood Foundation', role: 'CEO', sort_order: 1 },
    ]);

  bulkInsert('programs',
    ['icon', 'title', 'description', 'benefits', 'sort_order'],
    [
      { icon: 'GraduationCap', title: 'EDUCATION ACCESS', description: 'Providing free education, scholarships, and learning materials to underprivileged children and adults.', benefits: 'Free tutoring\nSchool supplies\nScholarship programs\nAdult literacy classes', sort_order: 0 },
      { icon: 'Stethoscope', title: 'HEALTHCARE SUPPORT', description: 'Offering medical care, mental health services, and health education to communities in need.', benefits: 'Free medical clinics\nMental health counseling\nHealth awareness\nMedicine assistance', sort_order: 1 },
      { icon: 'Accessibility', title: 'DISABILITY SERVICES', description: 'Supporting individuals with disabilities through assistive devices, therapy, and advocacy.', benefits: 'Mobility aids\nPhysical therapy\nAssistive technology\nRights advocacy', sort_order: 2 },
      { icon: 'Home', title: 'HOUSING ASSISTANCE', description: 'Helping families secure safe, affordable housing and providing home improvement support.', benefits: 'Emergency shelter\nRent assistance\nHome repairs\nHousing counseling', sort_order: 3 },
      { icon: 'Briefcase', title: 'JOB TRAINING', description: 'Empowering individuals with vocational training and employment opportunities.', benefits: 'Skills training\nJob placement\nCareer counseling\nEntrepreneurship support', sort_order: 4 },
      { icon: 'Apple', title: 'FOOD SECURITY', description: 'Ensuring access to nutritious food through food banks and community kitchens.', benefits: 'Food distribution\nCommunity meals\nNutrition education\nAgricultural training', sort_order: 5 },
    ]);

  bulkInsert('impact_stats',
    ['number', 'label', 'sublabel', 'suffix', 'sort_order'],
    [
      { number: 50000, label: 'MEALS SERVED', sublabel: 'In the last year', suffix: '+', sort_order: 0 },
      { number: 2500, label: 'PEOPLE TRAINED', sublabel: 'New job skills acquired', suffix: '+', sort_order: 1 },
      { number: 1200, label: 'CHILDREN EDUCATED', sublabel: 'Scholarships provided', suffix: '+', sort_order: 2 },
      { number: 800, label: 'MEDICAL VISITS', sublabel: 'Free healthcare provided', suffix: '+', sort_order: 3 },
      { number: 350, label: 'MOBILITY AIDS', sublabel: 'Wheelchairs & devices', suffix: '+', sort_order: 4 },
      { number: 95, label: 'SUCCESS RATE', sublabel: 'Program completion', suffix: '%', sort_order: 5 },
    ]);

  bulkInsert('success_stories',
    ['name', 'story', 'program', 'image', 'sort_order'],
    [
      { name: 'Maria Rodriguez', story: 'After losing my job during the pandemic, Smile Again Foundation helped me get back on my feet. They provided job training and connected me with a great employer. Now I can support my family again.', program: 'Job Training Program', image: 'https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 0 },
      { name: 'James Thompson', story: 'The wheelchair and accessibility modifications they provided changed my life completely. I can now move independently and participate fully in my community. I\'m forever grateful.', program: 'Disability Services', image: 'https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 1 },
      { name: 'Sarah Chen', story: 'My daughter received a full scholarship through their education program. She\'s now the first person in our family to attend university. This foundation gave us hope for a better future.', program: 'Education Access', image: 'https://images.unsplash.com/photo-1612723203798-321285cf5e3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 2 },
    ]);

  bulkInsert('volunteer_opportunities',
    ['title', 'location', 'time', 'spots', 'description', 'sort_order'],
    [
      { title: 'Community Outreach Volunteer', location: 'Multiple Locations', time: 'Weekends, 4-6 hours', spots: '10 positions available', description: 'Help distribute food, clothing, and essential supplies to families in need.', sort_order: 0 },
      { title: 'Education Tutor', location: 'Learning Centers', time: 'Flexible schedule', spots: '15 positions available', description: 'Provide one-on-one tutoring and mentorship to students in our education programs.', sort_order: 1 },
      { title: 'Healthcare Assistant', location: 'Mobile Clinics', time: 'Monthly rotations', spots: '5 positions available', description: 'Support medical staff during free clinic days and health awareness campaigns.', sort_order: 2 },
      { title: 'Event Coordinator', location: 'Remote/On-site', time: 'Project-based', spots: '8 positions available', description: 'Help organize fundraising events, awareness campaigns, and community gatherings.', sort_order: 3 },
    ]);

  bulkInsert('volunteer_items',
    ['kind', 'text', 'sort_order'],
    [
      { kind: 'requirement', text: '18 years or older (some exceptions for youth programs)', sort_order: 0 },
      { kind: 'requirement', text: 'Commitment to serve for minimum 3 months', sort_order: 1 },
      { kind: 'requirement', text: 'Background check clearance', sort_order: 2 },
      { kind: 'requirement', text: 'Attend volunteer orientation session', sort_order: 3 },
      { kind: 'requirement', text: 'Maintain professional and compassionate demeanor', sort_order: 4 },
      { kind: 'benefit', text: 'Make a real difference in your community', sort_order: 0 },
      { kind: 'benefit', text: 'Gain valuable skills and experience', sort_order: 1 },
      { kind: 'benefit', text: 'Meet like-minded individuals', sort_order: 2 },
      { kind: 'benefit', text: 'Volunteer certificates and references', sort_order: 3 },
      { kind: 'benefit', text: 'Professional development workshops', sort_order: 4 },
      { kind: 'benefit', text: 'Exclusive volunteer appreciation events', sort_order: 5 },
    ]);

  bulkInsert('upcoming_events',
    ['title', 'date', 'time', 'location', 'attendees', 'price', 'description', 'image', 'featured', 'sort_order'],
    [
      { title: 'Annual Charity Gala 2026', date: 'March 15, 2026', time: '6:00 PM - 11:00 PM', location: 'Grand Ballroom, City Convention Center', attendees: '500+ Expected', price: '$100 per ticket', description: 'Join us for an elegant evening of dining, entertainment, and fundraising to support our programs.', image: 'https://images.unsplash.com/photo-1769867628840-0aae1c912a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', featured: 1, sort_order: 0 },
      { title: 'Community Health Fair', date: 'February 22, 2026', time: '9:00 AM - 4:00 PM', location: 'Central Park Community Center', attendees: 'Open to All', price: 'FREE', description: 'Free health screenings, wellness workshops, and resources for the entire community.', image: 'https://images.unsplash.com/photo-1769867628840-0aae1c912a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', featured: 0, sort_order: 1 },
      { title: '5K Run for Hope', date: 'April 8, 2026', time: '7:00 AM - 12:00 PM', location: 'Riverside Park', attendees: '300+ Registered', price: '$30 Registration', description: 'Participate in our annual charity run to raise awareness and funds for disability services.', image: 'https://images.unsplash.com/photo-1769867628840-0aae1c912a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', featured: 0, sort_order: 2 },
      { title: 'Youth Education Summit', date: 'May 5, 2026', time: '10:00 AM - 5:00 PM', location: 'Tech Innovation Hub', attendees: '150 Students', price: 'FREE for Students', description: 'A day of workshops, mentorship, and inspiration for students in our education programs.', image: 'https://images.unsplash.com/photo-1769867628840-0aae1c912a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', featured: 0, sort_order: 3 },
    ]);

  bulkInsert('past_events',
    ['title', 'participants', 'raised', 'sort_order'],
    [
      { title: 'Winter Clothing Drive 2025', participants: '1,200+', raised: '$45,000', sort_order: 0 },
      { title: 'Back to School Fair 2025', participants: '800+', raised: '$32,000', sort_order: 1 },
      { title: 'Thanksgiving Community Dinner', participants: '2,000+', raised: '$28,000', sort_order: 2 },
    ]);

  bulkInsert('news',
    ['title', 'excerpt', 'date', 'image', 'category', 'sort_order'],
    [
      { title: 'Community Outreach Program Reaches 1000 Families', excerpt: 'Our latest community outreach initiative has successfully provided essential resources to over 1000 families in need.', date: 'January 28, 2026', image: 'https://images.unsplash.com/photo-1761666507437-9fb5a6ef7b0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', category: 'Community', sort_order: 0 },
      { title: 'New Education Center Opens in Rural Area', excerpt: 'We\'re proud to announce the opening of our newest education center, providing learning opportunities to underprivileged children.', date: 'January 20, 2026', image: 'https://images.unsplash.com/photo-1759143103113-6696d40598bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', category: 'Education', sort_order: 1 },
      { title: 'Free Healthcare Clinic Serves 500+ Patients', excerpt: 'Our mobile healthcare clinic has provided free medical services to over 500 patients in remote communities this month.', date: 'January 15, 2026', image: 'https://images.unsplash.com/photo-1706806595208-0e823368f240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', category: 'Healthcare', sort_order: 2 },
      { title: 'Accessibility Program Transforms Lives', excerpt: 'Our new accessibility initiative has provided mobility aids and support services to people with disabilities.', date: 'January 10, 2026', image: 'https://images.unsplash.com/photo-1713362758789-2530a5fa724a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', category: 'Accessibility', sort_order: 3 },
    ]);

  bulkInsert('media_videos',
    ['section', 'title', 'description', 'thumbnail', 'duration', 'category', 'date', 'featured', 'sort_order'],
    [
      { section: 'all', title: 'SAO Impact Story 2025', description: 'See how we\'ve transformed lives across 25 countries in 2025', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '5:24', category: 'Impact Story', date: '', featured: 1, sort_order: 0 },
      { section: 'all', title: 'Education Program Highlights', description: 'Students share their success stories from our education initiatives', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:45', category: 'Programs', date: '', featured: 0, sort_order: 1 },
      { section: 'all', title: 'Healthcare in Action', description: 'Inside our mobile health clinics serving rural communities', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:12', category: 'Healthcare', date: '', featured: 0, sort_order: 2 },
      { section: 'all', title: 'Volunteer Stories', description: 'Hear from volunteers making a difference every day', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '2:58', category: 'Community', date: '', featured: 0, sort_order: 3 },
      { section: 'all', title: 'Annual Gala 2025 Recap', description: 'Highlights from our biggest fundraising event of the year', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '6:30', category: 'Events', date: '', featured: 0, sort_order: 4 },
      { section: 'all', title: 'Disability Services Overview', description: 'Learn about our comprehensive disability support programs', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:45', category: 'Programs', date: '', featured: 0, sort_order: 5 },
      { section: 'impact', title: 'Maria\'s Journey to Independence', description: 'How job training changed Maria\'s life and her family\'s future', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:15', category: 'Impact Story', date: '', featured: 0, sort_order: 0 },
      { section: 'impact', title: 'James\' Story: Breaking Barriers', description: 'From wheelchair user to community advocate', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:02', category: 'Impact Story', date: '', featured: 0, sort_order: 1 },
      { section: 'impact', title: 'Education Changed Everything', description: 'Sarah\'s daughter becomes first in family to attend university', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:45', category: 'Impact Story', date: '', featured: 0, sort_order: 2 },
      { section: 'impact', title: 'Healthcare Heroes in Rural Areas', description: 'Meet the team bringing medical care to remote communities', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '5:10', category: 'Impact Story', date: '', featured: 0, sort_order: 3 },
      { section: 'impact', title: 'From Poverty to Prosperity', description: 'A family\'s transformation through our comprehensive programs', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '6:20', category: 'Impact Story', date: '', featured: 0, sort_order: 4 },
      { section: 'programs', title: 'Education Program Highlights 2025', description: 'Students share their success stories from our education initiatives', thumbnail: 'https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:45', category: 'Education', date: '', featured: 1, sort_order: 0 },
      { section: 'programs', title: 'Healthcare Mobile Clinics', description: 'Inside our mobile health clinics serving rural communities', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:12', category: 'Healthcare', date: '', featured: 0, sort_order: 1 },
      { section: 'programs', title: 'Job Training Success', description: 'Meet graduates from our vocational training programs', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '5:20', category: 'Job Training', date: '', featured: 0, sort_order: 2 },
      { section: 'programs', title: 'Disability Services Overview', description: 'Learn about our comprehensive disability support programs', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:45', category: 'Disability Services', date: '', featured: 0, sort_order: 3 },
      { section: 'programs', title: 'Food Security Initiative', description: 'How we\'re fighting hunger in underserved communities', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:30', category: 'Food Security', date: '', featured: 0, sort_order: 4 },
      { section: 'programs', title: 'Housing Accessibility Program', description: 'Making homes accessible for people with disabilities', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:15', category: 'Housing', date: '', featured: 0, sort_order: 5 },
      { section: 'events', title: 'Annual Gala 2025 Recap', description: 'Highlights from our biggest fundraising event of the year', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '6:30', category: '', date: 'Jan 15, 2025', featured: 1, sort_order: 0 },
      { section: 'events', title: 'Community Health Fair', description: 'Providing free health screenings to 500+ community members', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:20', category: '', date: 'Dec 10, 2024', featured: 0, sort_order: 1 },
      { section: 'events', title: 'Wheelchair Distribution Day', description: 'Delivering mobility devices to 50 individuals in need', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:45', category: '', date: 'Nov 25, 2024', featured: 0, sort_order: 2 },
      { section: 'events', title: 'School Supplies Drive 2024', description: '1000+ students received backpacks and supplies', thumbnail: 'https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '5:15', category: '', date: 'Sep 1, 2024', featured: 0, sort_order: 3 },
      { section: 'events', title: 'Volunteer Appreciation Day', description: 'Celebrating our amazing volunteer team', thumbnail: 'https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '4:00', category: '', date: 'Aug 15, 2024', featured: 0, sort_order: 4 },
      { section: 'events', title: 'Food Distribution Drive', description: 'Emergency food relief for 200 families', thumbnail: 'https://images.unsplash.com/photo-1528478940942-401d9b167878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', duration: '3:30', category: '', date: 'Jul 4, 2024', featured: 0, sort_order: 5 },
    ]);

  bulkInsert('photo_galleries',
    ['title', 'count', 'cover', 'sort_order'],
    [
      { title: 'Community Outreach 2025', count: '45', cover: 'https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 0 },
      { title: 'Health Fair Events', count: '32', cover: 'https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 1 },
      { title: 'School Programs', count: '58', cover: 'https://images.unsplash.com/photo-1755548413928-4aaeba7c740e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 2 },
      { title: 'Volunteer Activities', count: '67', cover: 'https://images.unsplash.com/photo-1630068846062-3ffe78aa5049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080', sort_order: 3 },
    ]);

  bulkInsert('resources',
    ['category', 'title', 'description', 'year', 'size', 'downloads', 'type', 'sort_order'],
    [
      { category: 'report', title: 'Annual Impact Report 2025', description: '', year: '2025', size: '4.2 MB', downloads: 1234, type: '', sort_order: 0 },
      { category: 'report', title: 'Annual Impact Report 2024', description: '', year: '2024', size: '3.8 MB', downloads: 2156, type: '', sort_order: 1 },
      { category: 'report', title: 'Annual Impact Report 2023', description: '', year: '2023', size: '3.5 MB', downloads: 1890, type: '', sort_order: 2 },
      { category: 'brochure', title: 'Organization Overview', description: 'Learn about SAO\'s mission and programs', year: '', size: '2.1 MB', downloads: 0, type: '', sort_order: 0 },
      { category: 'brochure', title: 'Volunteer Guide', description: 'Everything you need to know about volunteering', year: '', size: '1.8 MB', downloads: 0, type: '', sort_order: 1 },
      { category: 'brochure', title: 'Partnership Opportunities', description: 'Ways to partner with SAO', year: '', size: '2.5 MB', downloads: 0, type: '', sort_order: 2 },
      { category: 'brochure', title: 'Donor Impact Guide', description: 'See how your donations make a difference', year: '', size: '1.9 MB', downloads: 0, type: '', sort_order: 3 },
      { category: 'media', title: 'Logo Pack', description: 'High-resolution logos in various formats', year: '', size: '5.2 MB', downloads: 0, type: 'ZIP', sort_order: 0 },
      { category: 'media', title: 'Photo Library', description: 'High-quality photos from our programs', year: '', size: '45 MB', downloads: 0, type: 'ZIP', sort_order: 1 },
      { category: 'media', title: 'Brand Guidelines', description: 'Official SAO branding standards', year: '', size: '3.1 MB', downloads: 0, type: 'PDF', sort_order: 2 },
      { category: 'form', title: 'Volunteer Application', description: 'Apply to join our volunteer team', year: '', size: '', downloads: 0, type: '', sort_order: 0 },
      { category: 'form', title: 'Partnership Inquiry', description: 'Express interest in partnering with SAO', year: '', size: '', downloads: 0, type: '', sort_order: 1 },
      { category: 'form', title: 'Donation Receipt Request', description: 'Request a receipt for tax purposes', year: '', size: '', downloads: 0, type: '', sort_order: 2 },
      { category: 'form', title: 'Program Enrollment', description: 'Enroll in our education or training programs', year: '', size: '', downloads: 0, type: '', sort_order: 3 },
    ]);

  bulkInsert('about_values',
    ['icon', 'title', 'description', 'sort_order'],
    [
      { icon: 'Heart', title: 'COMPASSION', description: 'We believe in the power of empathy and understanding to transform lives.', sort_order: 0 },
      { icon: 'Users', title: 'COMMUNITY', description: 'Building stronger communities through collaboration and support.', sort_order: 1 },
      { icon: 'Lightbulb', title: 'INNOVATION', description: 'Finding creative solutions to tackle poverty and disability challenges.', sort_order: 2 },
      { icon: 'Target', title: 'IMPACT', description: 'Creating measurable, lasting change in the lives we touch.', sort_order: 3 },
    ]);

  bulkInsert('about_stats',
    ['value', 'label', 'sort_order'],
    [
      { value: '10K+', label: 'Lives Impacted', sort_order: 0 },
      { value: '50+', label: 'Programs', sort_order: 1 },
      { value: '25+', label: 'Countries', sort_order: 2 },
    ]);

  bulkInsert('contact_info',
    ['address', 'phone1', 'phone2', 'email1', 'email2', 'hours_mon', 'hours_sat', 'hours_sun', 'facebook', 'twitter', 'instagram', 'linkedin'],
    [
      { address: '123 Hope Street\nCommunity Center, Suite 456\nNew York, NY 10001', phone1: '+1 (555) 123-4567', phone2: '+1 (555) 987-6543', email1: 'info@smileagain.org', email2: 'support@smileagain.org', hours_mon: '9:00 AM - 6:00 PM', hours_sat: '10:00 AM - 4:00 PM', hours_sun: 'Closed', facebook: '#', twitter: '#', instagram: '#', linkedin: '#' },
    ]);

  bulkInsert('donate_stats',
    ['prefix', 'number', 'suffix', 'label', 'sort_order'],
    [
      { prefix: '', number: 15000, suffix: '+', label: 'Donors', sort_order: 0 },
      { prefix: '$', number: 2, suffix: 'M+', label: 'Raised 2025', sort_order: 1 },
      { prefix: '', number: 98, suffix: '%', label: 'To Programs', sort_order: 2 },
      { prefix: '', number: 50000, suffix: '+', label: 'Lives Changed', sort_order: 3 },
    ]);

  bulkInsert('donate_impact_examples',
    ['amount', 'impact', 'sort_order'],
    [
      { amount: 25, impact: 'Provides school supplies for 5 children', sort_order: 0 },
      { amount: 50, impact: 'Feeds a family for one week', sort_order: 1 },
      { amount: 100, impact: 'Provides medical care for 10 people', sort_order: 2 },
      { amount: 250, impact: 'Funds job training for 2 individuals', sort_order: 3 },
      { amount: 500, impact: 'Supports a wheelchair for someone in need', sort_order: 4 },
      { amount: 1000, impact: 'Funds a month of education programs', sort_order: 5 },
    ]);

  bulkInsert('donate_payment_methods',
    ['icon', 'name', 'description', 'sort_order'],
    [
      { icon: 'CreditCard', name: 'Credit/Debit Card', description: 'Secure online payment', sort_order: 0 },
      { icon: 'Building2', name: 'Bank Transfer', description: 'Direct bank deposit', sort_order: 1 },
      { icon: 'Smartphone', name: 'Mobile Money', description: 'M-Pesa, MTN, Airtel', sort_order: 2 },
    ]);

  bulkInsert('donate_bank',
    ['bank_name', 'account_name', 'account_number', 'swift', 'email'],
    [
      { bank_name: 'ABC Bank', account_name: 'Smile Again Organization', account_number: '1234567890', swift: 'ABCXXX123', email: 'donations@sao.org' },
    ]);

  setSetting('seeded', '1');
}

module.exports = { db, setSetting };
