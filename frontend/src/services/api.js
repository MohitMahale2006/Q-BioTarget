const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000';

export async function analyzePatient(payload) {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid response from backend.');
  }

  if (!response.ok) {
    const message = data.detail || data.message || 'Unable to complete analysis request.';
    throw new Error(message);
  }

  return data;
}
