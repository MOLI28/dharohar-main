const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }
  return res.json();
}
export const api = {
  search: (q, params='') => request(`/api/search?q=${encodeURIComponent(q)}${params}`),
  listHeritage: (params='') => request(`/api/heritage${params}`),
  heritage: (id) => request(`/api/heritage/${encodeURIComponent(id)}`),
  timeline: (id) => request(`/api/heritage/${encodeURIComponent(id)}/timeline`),
  locations: (id) => request(`/api/heritage/${encodeURIComponent(id)}/locations`),
  categories: () => request('/api/categories'),
  nearby: (lat, lon, radius=100) => request(`/api/explore/nearby?lat=${lat}&lon=${lon}&radius_km=${radius}`),
  chat: (question, heritage_id, language='en') => request('/api/ai/chat', { method:'POST', body: JSON.stringify({question, heritage_id, language}) })
};
export default api;
