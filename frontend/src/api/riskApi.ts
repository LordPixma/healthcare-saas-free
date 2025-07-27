const API_URL = '/api/risks';

export async function fetchRisks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch risks');
  return res.json();
}

export async function fetchRisk(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch risk');
  return res.json();
}

export async function createRisk(data: any) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create risk');
  return res.json();
}

export async function updateRisk(id: string, data: any) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update risk');
  return res.json();
}
