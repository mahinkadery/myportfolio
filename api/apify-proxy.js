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
    let actorId = process.env.APIFY_ACTOR_ID;

    if (!token || !actorId) {
      console.error('Missing APIFY_TOKEN or APIFY_ACTOR_ID');
      return res.status(500).json({ error: 'Server misconfigured' });
    }

    // URL encode the actor ID to handle special characters if needed
    const encodedActorId = encodeURIComponent(actorId);

    // Build the input object - different actors may expect different formats
    // Try common formats: startUrls for web scrapers, url for simple actors, or custom input
    const input = {
      // Format 1: startUrls (most common for web scrapers)
      startUrls: [{ url: targetUrl }],
      // Format 2: direct url property (some actors expect this)
      url: targetUrl,
      // Include any additional options
      ...(options || {}),
    };

    // Use waitForFinish as a query parameter (recommended by Apify API)
    // This will start a run and wait for it to complete (up to 300 seconds = 5 minutes)
    const waitForFinish = 300;
    const runResponse = await fetch(
      `https://api.apify.com/v2/acts/${encodedActorId}/runs?waitForFinish=${waitForFinish}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      }
    );

    if (!runResponse.ok) {
      let errorText = '';
      let errorData = null;
      try {
        errorText = await runResponse.text();
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }
      } catch (e) {
        errorText = 'Unknown error';
      }
      
      console.error('Apify run error:', {
        status: runResponse.status,
        statusText: runResponse.statusText,
        error: errorData || errorText
      });
      
      return res.status(502).json({ 
        error: 'Apify request failed',
        details: errorData?.detail || errorData?.message || errorData?.error?.message || errorText,
        status: runResponse.status,
        statusText: runResponse.statusText,
        fullError: errorData
      });
    }

    const runData = await runResponse.json();
    
    // Check if run status is successful
    if (runData.data?.status === 'FAILED' || runData.data?.status === 'ABORTED') {
      return res.status(502).json({ 
        error: `Apify run ${runData.data.status.toLowerCase()}`,
        details: runData.data?.statusMessage || 'Run did not complete successfully',
        runData: runData.data
      });
    }

    // Get dataset items from the run
    const datasetId = runData.data?.defaultDatasetId;
    
    if (!datasetId) {
      return res.status(502).json({ 
        error: 'Apify run completed but no dataset ID found',
        details: 'The actor may not have stored results in a dataset',
        runData: runData.data
      });
    }

    const datasetResponse = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!datasetResponse.ok) {
      let errorText = '';
      let errorData = null;
      try {
        errorText = await datasetResponse.text();
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { detail: errorText };
        }
      } catch (e) {
        errorText = 'Unknown error';
      }
      
      console.error('Apify dataset error:', {
        status: datasetResponse.status,
        statusText: datasetResponse.statusText,
        error: errorData || errorText
      });
      
      return res.status(502).json({ 
        error: 'Failed to fetch dataset items',
        details: errorData?.detail || errorData?.message || errorData?.error?.message || errorText,
        status: datasetResponse.status,
        statusText: datasetResponse.statusText
      });
    }

    const items = await datasetResponse.json();

    return res.status(200).json({
      success: true,
      items,
      runId: runData.data?.id,
      datasetId: datasetId
    });
  } catch (err) {
    console.error('Apify proxy error:', err);
    return res.status(500).json({ 
      error: 'Server error',
      details: err.message || 'An unexpected error occurred',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}

