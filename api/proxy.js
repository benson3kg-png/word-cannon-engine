export default async function handler(req, res) {
  const inboundToken = req.headers['x-vector-key'] || req.query.vector_key;
  const masterKey = process.env.X_VECTOR_KEY || "VECTOR_SYSTEM_SECURE_PASS_2026";

  if (!inboundToken || inboundToken !== masterKey) {
    return res.status(401).json({ status: "PROXY_ACCESS_DENIED", network_code: 401 });
  }

  const targetUrl = req.query.target_url || req.headers['x-target-url'];
  if (!targetUrl) {
    return res.status(400).json({ status: "BAD_REQUEST", message: "Provide a target_url parameter." });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 'User-Agent': 'Mozilla/5.0' },
      body: ['POST', 'PUT'].includes(req.method) ? JSON.stringify(req.body) : null
    });
    const outputData = await response.text();
    let structuredPayload;
    try { structuredPayload = JSON.parse(outputData); } catch { structuredPayload = outputData; }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ status: "PROXY_SUCCESSFUL", destination: targetUrl, payload: structuredPayload });
  } catch {
    return res.status(500).json({ status: "PROXY_CRASH" });
  }
}
