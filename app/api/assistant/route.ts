export async function POST(request: Request) {
  const { messages } = await request.json();
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ reply: "Assistant isn't configured yet \u2014 add GROQ_API_KEY to enable live chat." });
  }
  const systemPrompt = "You're the friendly AI assistant for AI Nonprofit Governance Platform. Help professionals turn scheduling friction into a clear booking and availability workflow. Keep replies short, casual, and Gen Z in tone (helpful, not cringe), answer questions about the product, and nudge people toward trying the free workflow at /app or checking /pricing when relevant.";
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'system', content: systemPrompt }, ...(Array.isArray(messages) ? messages : [])],
      temperature: 0.7
    })
  });
  if (!response.ok) {
    return Response.json({ reply: 'Assistant is taking a breather, try again in a sec.' });
  }
  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "Not sure how to respond to that \u2014 try asking about pricing or how it works!";
  return Response.json({ reply });
}
