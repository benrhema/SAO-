const path = require('path');
const express = require('express');
const cors = require('cors');
const { db, setSetting } = require('./db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'sao-admin-token';

// ---------------------------------------------------------------------------
// Resource configuration (whitelist of writable columns -> safe SQL)
// ---------------------------------------------------------------------------
const RESOURCES = {
  team: {
    table: 'team_members',
    ints: ['sort_order'],
    columns: ['type', 'name', 'role', 'bio', 'image', 'email', 'linkedin', 'department', 'sort_order'],
  },
  partners: {
    table: 'partners',
    ints: ['sort_order'],
    columns: ['type', 'name', 'category', 'since', 'region', 'sort_order'],
  },
  testimonials: {
    table: 'testimonials',
    ints: ['sort_order'],
    columns: ['quote', 'author', 'organization', 'role', 'sort_order'],
  },
  programs: {
    table: 'programs',
    ints: ['sort_order'],
    columns: ['icon', 'title', 'description', 'benefits', 'sort_order'],
  },
  impact_stats: {
    table: 'impact_stats',
    ints: ['number', 'sort_order'],
    columns: ['number', 'label', 'sublabel', 'suffix', 'sort_order'],
  },
  success_stories: {
    table: 'success_stories',
    ints: ['sort_order'],
    columns: ['name', 'story', 'program', 'image', 'sort_order'],
  },
  volunteer_opportunities: {
    table: 'volunteer_opportunities',
    ints: ['sort_order'],
    columns: ['title', 'location', 'time', 'spots', 'description', 'sort_order'],
  },
  volunteer_items: {
    table: 'volunteer_items',
    ints: ['sort_order'],
    columns: ['kind', 'text', 'sort_order'],
  },
  upcoming_events: {
    table: 'upcoming_events',
    ints: ['featured', 'sort_order'],
    columns: ['title', 'date', 'time', 'location', 'attendees', 'price', 'description', 'image', 'featured', 'sort_order'],
  },
  past_events: {
    table: 'past_events',
    ints: ['sort_order'],
    columns: ['title', 'participants', 'raised', 'sort_order'],
  },
  news: {
    table: 'news',
    ints: ['sort_order'],
    columns: ['title', 'excerpt', 'date', 'image', 'category', 'sort_order'],
  },
  media_videos: {
    table: 'media_videos',
    ints: ['featured', 'sort_order'],
    columns: ['section', 'title', 'description', 'thumbnail', 'duration', 'category', 'date', 'featured', 'sort_order'],
  },
  photo_galleries: {
    table: 'photo_galleries',
    ints: ['sort_order'],
    columns: ['title', 'count', 'cover', 'sort_order'],
  },
  resources: {
    table: 'resources',
    ints: ['downloads', 'sort_order'],
    columns: ['category', 'title', 'description', 'year', 'size', 'downloads', 'type', 'sort_order'],
  },
  about_values: {
    table: 'about_values',
    ints: ['sort_order'],
    columns: ['icon', 'title', 'description', 'sort_order'],
  },
  about_stats: {
    table: 'about_stats',
    ints: ['sort_order'],
    columns: ['value', 'label', 'sort_order'],
  },
  contact_info: {
    table: 'contact_info',
    single: true,
    ints: [],
    columns: ['address', 'phone1', 'phone2', 'email1', 'email2', 'hours_mon', 'hours_sat', 'hours_sun', 'facebook', 'twitter', 'instagram', 'linkedin'],
  },
  donate_stats: {
    table: 'donate_stats',
    ints: ['number', 'sort_order'],
    columns: ['prefix', 'number', 'suffix', 'label', 'sort_order'],
  },
  donate_impact_examples: {
    table: 'donate_impact_examples',
    ints: ['amount', 'sort_order'],
    columns: ['amount', 'impact', 'sort_order'],
  },
  donate_payment_methods: {
    table: 'donate_payment_methods',
    ints: ['sort_order'],
    columns: ['icon', 'name', 'description', 'sort_order'],
  },
  donate_bank: {
    table: 'donate_bank',
    single: true,
    ints: [],
    columns: ['bank_name', 'account_name', 'account_number', 'swift', 'email'],
  },
};

function castRow(resource, row) {
  const cfg = RESOURCES[resource];
  if (!cfg) return row;
  const out = { ...row };
  for (const col of cfg.ints) {
    if (out[col] !== null && out[col] !== undefined && out[col] !== '') {
      out[col] = Number(out[col]);
    }
  }
  return out;
}

function getRows(resource) {
  const cfg = RESOURCES[resource];
  const rows = db.prepare(`SELECT * FROM ${cfg.table} ORDER BY sort_order ASC, id ASC`).all();
  return rows.map((r) => castRow(resource, r));
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  }
  return res.status(401).json({ error: 'Invalid password' });
});

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (token === ADMIN_TOKEN) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// ---------------------------------------------------------------------------
// Aggregated content for the public site (defined BEFORE generic /api/:resource)
// ---------------------------------------------------------------------------
app.get('/api/content', (req, res) => {
  const settings = {};
  const sRows = db.prepare('SELECT key, value FROM settings').all();
  for (const r of sRows) settings[r.key] = r.value;

  const suggested = (settings.donate_suggested_amounts || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map(Number);

  const media = getRows('media_videos');
  const resources = getRows('resources');
  const volunteerItems = getRows('volunteer_items');

  const content = {
    settings,
    team: getRows('team'),
    partners: getRows('partners'),
    testimonials: getRows('testimonials'),
    programs: getRows('programs'),
    impact_stats: getRows('impact_stats'),
    success_stories: getRows('success_stories'),
    volunteer_opportunities: getRows('volunteer_opportunities'),
    volunteer_requirements: volunteerItems.filter((v) => v.kind === 'requirement'),
    volunteer_benefits: volunteerItems.filter((v) => v.kind === 'benefit'),
    upcoming_events: getRows('upcoming_events'),
    past_events: getRows('past_events'),
    news: getRows('news'),
    media: {
      all: media.filter((m) => m.section === 'all'),
      impact: media.filter((m) => m.section === 'impact'),
      programs: media.filter((m) => m.section === 'programs'),
      events: media.filter((m) => m.section === 'events'),
    },
    photo_galleries: getRows('photo_galleries'),
    resources: {
      reports: resources.filter((r) => r.category === 'report'),
      brochures: resources.filter((r) => r.category === 'brochure'),
      media: resources.filter((r) => r.category === 'media'),
      forms: resources.filter((r) => r.category === 'form'),
    },
    about_values: getRows('about_values'),
    about_stats: getRows('about_stats'),
    contact_info: (() => {
      const row = db.prepare('SELECT * FROM contact_info ORDER BY id ASC LIMIT 1').get();
      return row || {};
    })(),
    donate_stats: getRows('donate_stats'),
    donate_suggested_amounts: suggested,
    donate_impact_examples: getRows('donate_impact_examples'),
    donate_payment_methods: getRows('donate_payment_methods'),
    donate_bank: (() => {
      const row = db.prepare('SELECT * FROM donate_bank ORDER BY id ASC LIMIT 1').get();
      return row || {};
    })(),
  };
  res.json(content);
});

// settings (scalar key/value)
app.get('/api/settings/:key', (req, res) => {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(req.params.key);
  res.json({ key: req.params.key, value: row ? row.value : '' });
});

app.put('/api/settings/:key', authMiddleware, (req, res) => {
  const { value } = req.body || {};
  setSetting(req.params.key, value == null ? '' : String(value));
  res.json({ key: req.params.key, value: String(value == null ? '' : value) });
});

// ---------------------------------------------------------------------------
// Public form submissions (defined BEFORE generic CRUD so they are not
// intercepted by the auth-guarded POST /api/:resource route)
// ---------------------------------------------------------------------------
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  db.prepare('INSERT INTO contacts (name, email, phone, message, created_at) VALUES (?, ?, ?, ?, ?)')
    .run(name, email, phone || '', message, new Date().toISOString());
  res.json({ ok: true });
});

app.post('/api/volunteer', (req, res) => {
  const { name, email, phone, opportunity, message } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'Missing fields' });
  db.prepare('INSERT INTO volunteer_applications (name, email, phone, opportunity, message, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .run(name, email, phone || '', opportunity || '', message || '', new Date().toISOString());
  res.json({ ok: true });
});

app.post('/api/donation', (req, res) => {
  const { donation_type, amount, first_name, last_name, email, phone, payment_method } = req.body || {};
  if (!amount || !email) return res.status(400).json({ error: 'Missing fields' });
  db.prepare('INSERT INTO donations (donation_type, amount, first_name, last_name, email, phone, payment_method, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(donation_type || 'one-time', Number(amount) || 0, first_name || '', last_name || '', email, phone || '', payment_method || '', new Date().toISOString());
  res.json({ ok: true });
});

// ---------------------------------------------------------------------------
// Generic CRUD
// ---------------------------------------------------------------------------
app.get('/api/:resource', (req, res) => {
  const resource = req.params.resource;
  const cfg = RESOURCES[resource];
  if (!cfg) return res.status(404).json({ error: 'Unknown resource' });
  if (cfg.single) {
    const row = db.prepare(`SELECT * FROM ${cfg.table} ORDER BY id ASC LIMIT 1`).get();
    return res.json(row ? castRow(resource, row) : null);
  }
  return res.json(getRows(resource));
});

app.post('/api/:resource', authMiddleware, (req, res) => {
  const resource = req.params.resource;
  const cfg = RESOURCES[resource];
  if (!cfg || cfg.single) return res.status(404).json({ error: 'Unknown resource' });
  const body = req.body || {};
  const cols = cfg.columns.filter((c) => c in body);
  if (cols.length === 0) return res.status(400).json({ error: 'No valid fields' });
  const placeholders = cols.map(() => '?').join(', ');
  const values = cols.map((c) => (cfg.ints.includes(c) ? Number(body[c]) || 0 : body[c]));
  const info = db
    .prepare(`INSERT INTO ${cfg.table} (${cols.join(', ')}) VALUES (${placeholders})`)
    .run(...values);
  const row = db.prepare(`SELECT * FROM ${cfg.table} WHERE id = ?`).get(info.lastInsertRowid);
  return res.json(castRow(resource, row));
});

app.put('/api/:resource/:id', authMiddleware, (req, res) => {
  const resource = req.params.resource;
  const cfg = RESOURCES[resource];
  if (!cfg) return res.status(404).json({ error: 'Unknown resource' });
  const body = req.body || {};
  const cols = cfg.columns.filter((c) => c in body);
  if (cols.length === 0) return res.status(400).json({ error: 'No valid fields' });
  const sets = cols.map((c) => `${c} = ?`).join(', ');
  const values = cols.map((c) => (cfg.ints.includes(c) ? Number(body[c]) || 0 : body[c]));
  values.push(req.params.id);
  db.prepare(`UPDATE ${cfg.table} SET ${sets} WHERE id = ?`).run(...values);
  const row = db.prepare(`SELECT * FROM ${cfg.table} WHERE id = ?`).get(req.params.id);
  return res.json(row ? castRow(resource, row) : null);
});

app.delete('/api/:resource/:id', authMiddleware, (req, res) => {
  const resource = req.params.resource;
  const cfg = RESOURCES[resource];
  if (!cfg || cfg.single) return res.status(404).json({ error: 'Unknown resource' });
  db.prepare(`DELETE FROM ${cfg.table} WHERE id = ?`).run(req.params.id);
  return res.json({ ok: true });
});

// settings (scalar key/value)
app.get('/api/settings/:key', (req, res) => {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(req.params.key);
  res.json({ key: req.params.key, value: row ? row.value : '' });
});

app.put('/api/settings/:key', authMiddleware, (req, res) => {
  const { value } = req.body || {};
  setSetting(req.params.key, value == null ? '' : String(value));
  res.json({ key: req.params.key, value: String(value == null ? '' : value) });
});

// ---------------------------------------------------------------------------
// Admin: view submitted records
// ---------------------------------------------------------------------------
app.get('/api/admin/contacts', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM contacts ORDER BY id DESC').all());
});
app.get('/api/admin/volunteers', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM volunteer_applications ORDER BY id DESC').all());
});
app.get('/api/admin/donations', authMiddleware, (req, res) => {
  res.json(db.prepare('SELECT * FROM donations ORDER BY id DESC').all());
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[SAO API] running on http://localhost:${PORT}`);
});
