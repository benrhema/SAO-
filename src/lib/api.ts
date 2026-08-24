const TOKEN_KEY = 'sao_admin_token';
const SUPER_KEY = 'sao_admin_is_super';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}
export function setToken(t: string) {
  localStorage.setItem(TOKEN_KEY, t);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SUPER_KEY);
}
export function isSuperUser() {
  return localStorage.getItem(SUPER_KEY) === '1';
}
export function setSuperUser(v: boolean) {
  localStorage.setItem(SUPER_KEY, v ? '1' : '0');
}

const BASE = '/api';

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Token ${token}`;
  const res = await fetch(BASE + path, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message =
      err.error ||
      err.detail ||
      (typeof err === 'object' ? Object.values(err).flat().join(' ') : '') ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getContent: () => request('/content'),
  get: (resource: string) => request(`/${resource}`),
  create: (resource: string, data: any) => request(`/${resource}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (resource: string, id: string, data: any) => request(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (resource: string, id: string) => request(`/${resource}/${id}`, { method: 'DELETE' }),
  login: (username: string, password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  contact: (data: { name: string; email: string; phone?: string; message: string }) =>
    request('/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form_type: 'contact',
        applicant_name: data.name,
        email: data.email,
        phone: data.phone || '',
        message_or_details: data.message,
      }),
    }),
  volunteer: (data: { name: string; email: string; phone?: string; opportunity?: string; message?: string }) =>
    request('/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form_type: 'volunteer',
        applicant_name: data.name,
        email: data.email,
        phone: data.phone || '',
        message_or_details: [data.opportunity, data.message].filter(Boolean).join(' — '),
      }),
    }),
  donation: (data: any) => request('/donations', { method: 'POST', body: JSON.stringify(data) }),
  uploadFile: async (file: File): Promise<{ url: string }> => {
    const headers: Record<string, string> = {};
    const token = getToken();
    if (token) headers['Authorization'] = `Token ${token}`;
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(BASE + '/upload', { method: 'POST', headers, body: formData });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Upload failed (${res.status})`);
    }
    return res.json();
  },
};
