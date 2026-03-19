/**
 * Intake Form Submission Endpoint
 *
 * Receives form data and creates a contact in GoHighLevel.
 * Keeps GHL API key server-side (never exposed to the browser).
 *
 * Required Vercel env vars:
 *   GHL_API_KEY       — GoHighLevel API key (Location or Agency level)
 *   GHL_LOCATION_ID   — GoHighLevel Location ID
 *
 * Optional:
 *   TRACKING_WEBHOOK_URL — Also receives submission events
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

  const GHL_API_KEY = process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error('Missing GHL_API_KEY or GHL_LOCATION_ID env vars');
    // Return 200 anyway so the frontend flow isn't blocked during setup
    res.status(200).json({ ok: false, error: 'GHL not configured' });
    return;
  }

  try {
    const {
      firstName, lastName, email, phone, gymName,
      isOwner, knelpunt, openForChange, goal, gymType,
      variant,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      fbclid, gclid,
    } = req.body;

    // Build tags array
    const tags = ['[trigger] intake homepage ingevuld', `variant-${variant || 'unknown'}`];
    if (gymType) tags.push(`gymtype-${gymType}`);

    // Value mappings: our form values → GHL option labels
    const KNELPUNT_MAP = {
      'te-weinig-leden': 'Te weinig nieuwe leden',
      'geen-structuur': 'Te weinig structuur in marketing & sales',
      'lage-conversie': 'Te lage conversie van leads naar leden',
      'te-afhankelijk': 'Alles draait te veel op mij als eigenaar',
    };
    const GOAL_MAP = {
      'groei-leden': 'Structureel groeien in leden',
      'rust': 'Meer rust & voorspelbaarheid in de business',
      'opschalen': 'Opschalen met team en processen',
      'weet-niet': 'Ik weet het nog niet',
    };
    const GYMTYPE_MAP = {
      'pt-studio': '(Small group) personal training studio',
      'crossfit': 'CrossFit / functionele trainingsgym',
      'fitness': 'Reguliere fitness (met abonnementen & vrije inloop)',
      'vechtsport': 'Vechtsportschool (judo, karate, boksen, MMA e.d.)',
      'pilates-yoga': 'Pilates of yoga-studio',
    };

    // GHL Custom Field IDs (mapped from GHL API)
    const customFields = [
      { id: 'eeOgjHH7ouNaw7IrGqsQ', value: isOwner === 'ja' ? 'Ja' : 'Nee' },
      { id: '1ghoojx7IDESNTIVmb33', value: KNELPUNT_MAP[knelpunt] || knelpunt },
      { id: 'Bsa6XDV0stf7cwh3z0Gr', value: openForChange === 'ja' ? 'Ja' : 'Nee' },
      { id: 'HrjK1x9DQnWvUfhEfbCF', value: GOAL_MAP[goal] || goal },
      { id: '9xZwPiX6GZrLYVsiHKBx', value: GYMTYPE_MAP[gymType] || gymType },
    ].filter(f => f.value);

    const ghlPayload = {
      firstName,
      lastName,
      email,
      phone,
      companyName: gymName,
      locationId: GHL_LOCATION_ID,
      source: 'survey | intake homepage',
      tags,
      customFields,
    };

    const ghlHeaders = {
      'Authorization': `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    };

    let contactId;
    const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify(ghlPayload),
    });

    if (response.ok) {
      const data = await response.json();
      contactId = data.contact?.id;
    } else if (response.status === 400) {
      // Duplicate contact — update existing
      const errorData = await response.json();
      const existingId = errorData.meta?.contactId;
      if (existingId) {
        const { locationId: _lid, ...updatePayload } = ghlPayload;
        const updateRes = await fetch(`https://services.leadconnectorhq.com/contacts/${existingId}`, {
          method: 'PUT',
          headers: ghlHeaders,
          body: JSON.stringify(updatePayload),
        });
        if (updateRes.ok) {
          contactId = existingId;
        } else {
          console.error('GHL update error:', updateRes.status, await updateRes.text());
          res.status(200).json({ ok: false, error: 'GHL update failed' });
          return;
        }
      } else {
        console.error('GHL duplicate but no contactId in response');
        res.status(200).json({ ok: false, error: 'GHL submission failed' });
        return;
      }
    } else {
      console.error('GHL API error:', response.status, await response.text());
      res.status(200).json({ ok: false, error: 'GHL submission failed' });
      return;
    }

    // Log successful submission
    console.log(JSON.stringify({
      _type: 'intake_submission',
      contactId,
      variant,
      gymType,
      knelpunt,
      goal,
      utm_source,
      utm_campaign,
    }));

    // Forward to webhook if configured
    const webhookUrl = process.env.TRACKING_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _type: 'intake_submission',
          contactId,
          ...req.body,
        }),
      }).catch(() => {});
    }

    res.status(200).json({ ok: true, contactId });
  } catch (err) {
    console.error('Submit error:', err.message);
    // Return 200 so frontend flow continues
    res.status(200).json({ ok: false, error: 'Internal error' });
  }
}
