const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0nYdU2wI104Fh5bEQCjO0Jj-iOdLP03QyxaYw1XiAP-XkjUFQVUGZEu-UiUMpGDTF/exec';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const params = new URLSearchParams(req.query);
      const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`);
      const data = await response.json();
      res.status(200).json(data);
    } else if (req.method === 'POST') {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(req.body)
      });
      const data = await response.json();
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
