/**
 * Intake Form Event Tracking Endpoint
 *
 * Receives form events (FormView, FormStart, StepComplete, FormSubmit, Disqualified)
 * and logs them to Vercel stdout + optionally forwards to a webhook.
 *
 * Events are queryable via Vercel Logs or Log Drain.
 * Set TRACKING_WEBHOOK_URL in Vercel env vars to forward to n8n/GHL/Sheets.
 */
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Log to Vercel stdout (queryable via Vercel Logs / Log Drain)
    console.log(JSON.stringify({ _type: 'intake_event', _ts: Date.now(), ...event }));

    // Forward to webhook if configured
    const webhookUrl = process.env.TRACKING_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(() => {});
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(400).json({ error: 'Invalid payload' });
  }
}
