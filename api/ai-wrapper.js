export default async function handler(req, res) {
  const inboundToken = req.headers['x-vector-key'] || req.query.vector_key;
  const masterKey = process.env.X_VECTOR_KEY || "VECTOR_SYSTEM_SECURE_PASS_2026";

  if (!inboundToken || inboundToken !== masterKey) {
    return res.status(401).json({ status: "AUTH_FAILED", network_code: 401 });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ status: "METHOD_NOT_ALLOWED" });
  }

  try {
    const { rawContext, systemPersona, outputFormat } = req.body;
    if (!rawContext) { return res.status(400).json({ status: "MISSING_CONTEXT" }); }

    return res.status(200).json({
      status: "AI_COMPRESSION_SUCCESS",
      generated_at: Date.now(),
      optimizedPromptPayload: {
        systemInstruction: `You are an elite ${systemPersona || "ARCHITECT"}.`,
        contextDataInjection: rawContext.trim(),
        structuralOutputConstraints: `Format as ${outputFormat || "JSON"}.`
      }
    });
  } catch {
    return res.status(500).json({ status: "COMPILER_CRASH" });
  }
}
