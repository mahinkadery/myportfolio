// api/apify-proxy.js
export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { targetUrl, options } = req.body || {};

    if (!targetUrl || typeof targetUrl !== 'string') {
      return res.status(400).json({ error: 'targetUrl is required' });
    }

    const token = process.env.APIFY_TOKEN;
    const actorId = process.env.APIFY_ACTOR_ID;

    if (!token || !actorId) {
      console.error('Missing APIFY_TOKEN or APIFY_ACTOR_ID');
      return res.status(500).json({ error: 'Server misconfigured' });
    }

    const apifyResponse = await fetch(
      `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Keep token server-side only
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // Adjust these keys if your actor expects a different input shape
          url: targetUrl,
          options: options || {},
        }),
      }
    );

    if (!apifyResponse.ok) {
      const errorText = await apifyResponse.text();
      console.error('Apify error:', apifyResponse.status, errorText);
      return res.status(502).json({ error: 'Apify request failed' });
    }

    // Most actors that use run-sync-get-dataset-items return an array of items
    const items = await apifyResponse.json();

    return res.status(200).json({
      success: true,
      items,
    });
  } catch (err) {
    console.error('Apify proxy error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

