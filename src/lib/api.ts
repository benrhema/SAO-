const TOKEN_KEY = 'sao_admin_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}
export function setToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const BASE = '/api';

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(BASE + path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  getContent: () => request('/content'),
  get: (resource: string) => request(`/${resource}`),
  create: (resource: string, data: any) => request(`/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (resource: string, id: number, data: any) => request(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (resource: string, id: number) => request(`/${resource}/${id}`, { method: 'DELETE' }),
  getSetting: (key: string) => request(`/settings/${key}`),
  setSetting: (key: string, value: any) => request(`/settings/${key}`, { method: 'PUT', body: JSON.stringify({ value }) }),
  login: (password: string) => request('/admin/login', { method: 'POST', body: JSON.stringify({ password }) }),
  contact: (data: any) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  volunteer: (data: any) => request('/volunteer', { method: 'POST', body: JSON.stringify(data) }),
  donation: (data: any) => request('/donation', { method: 'POST', body: JSON.stringify(data) }),
};
