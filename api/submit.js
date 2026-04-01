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
 *   INTAKE_WEBHOOK_URL   — GHL webhook to trigger tracking workflow
 */

async function sendAlert(message) {
  try {
    await fetch('https://n8n.vollegym.nl/webhook/api-error-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    });
  } catch { /* don't let alert failures break the flow */ }
}

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
    await sendAlert('🚨 **Intake API fout**\nGHL_API_KEY of GHL_LOCATION_ID ontbreekt in Vercel env vars.');
    res.status(200).json({ ok: false, error: 'GHL not configured' });
    return;
  }

  try {
    const {
      firstName, lastName, email, phone, gymName,
      isOwner, knelpunt, openForChange, goal, smallGroup, gymType,
      variant,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      fbclid, gclid, gbraid, wbraid,
      landingUrl, referrer, userAgent,
      fbc, fbp, gaClientId, gaSessionId,
    } = req.body;

    const qualified = isOwner === 'ja' && openForChange === 'ja' && smallGroup !== 'nee';

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
    const SMALLGROUP_MAP = {
      'ja-actief': 'Ja, ik geef al small group training',
      'ja-ambitie': 'Ja, dat wil ik gaan opzetten',
      'nee': 'Nee, en dat is ook niet mijn plan',
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
      { id: 'oGcL56tAGOhnTvyMlZ8l', value: SMALLGROUP_MAP[smallGroup] || smallGroup },
      { id: '9xZwPiX6GZrLYVsiHKBx', value: GYMTYPE_MAP[gymType] || gymType },
      { id: 'SEIxXstAyZsoVVRCxAwz', value: qualified ? 'Ja' : 'Nee' },
    ].filter(f => f.value);

    // Build attributionSource with full context for GHL attribution tracking
    const clientIp = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '').split(',')[0].trim();
    const clientUA = userAgent || req.headers['user-agent'] || '';

    const attributionSource = {
      url: landingUrl || 'https://www.vollegym.nl/intake',
      referrer: referrer || '',
      userAgent: clientUA,
      ip: clientIp,
      medium: 'form',
    };
    if (utm_source) {
      attributionSource.utmSource = utm_source;
      attributionSource.adSource = utm_source;
      attributionSource.sessionSource = utm_source === 'facebook' || utm_source === 'ig' ? 'Paid Social' : 'Direct traffic';
    } else {
      attributionSource.sessionSource = referrer ? 'Referral' : 'Direct traffic';
    }
    if (utm_campaign) attributionSource.utmCampaign = utm_campaign;
    if (utm_medium) attributionSource.utmMedium = utm_medium;
    if (utm_content) attributionSource.utmContent = utm_content;
    if (utm_term) attributionSource.utmTerm = utm_term;
    if (fbclid) attributionSource.fbclid = fbclid;
    if (gclid) attributionSource.gclid = gclid;
    if (gbraid) attributionSource.gbraid = gbraid;
    if (wbraid) attributionSource.wbraid = wbraid;
    if (fbc) attributionSource.fbc = fbc;
    if (fbp) attributionSource.fbp = fbp;
    if (gaClientId) attributionSource.gaClientId = gaClientId;
    if (gaSessionId) attributionSource.gaSessionId = gaSessionId;
    if (utm_campaign) attributionSource.campaign = utm_campaign;

    const ghlPayload = {
      firstName,
      lastName,
      email,
      phone,
      companyName: gymName,
      locationId: GHL_LOCATION_ID,
      source: utm_source === 'facebook' || utm_source === 'ig' ? 'Facebook' : utm_source || 'Website',
      customFields,
      attributionSource,
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
          const errText = await updateRes.text();
          console.error('GHL update error:', updateRes.status, errText);
          await sendAlert(`🚨 **Intake API fout**\nGHL contact update mislukt (${updateRes.status})\n\nLead: ${firstName} ${lastName} (${email})\nError: ${errText}`);
          res.status(200).json({ ok: false, error: 'GHL update failed' });
          return;
        }
      } else {
        console.error('GHL duplicate but no contactId in response');
        await sendAlert(`🚨 **Intake API fout**\nDuplicate contact maar geen contactId in GHL response\n\nLead: ${firstName} ${lastName} (${email})`);
        res.status(200).json({ ok: false, error: 'GHL submission failed' });
        return;
      }
    } else {
      const errText = await response.text();
      console.error('GHL API error:', response.status, errText);
      await sendAlert(`🚨 **Intake API fout**\nGHL contact aanmaken mislukt (${response.status})\n\nLead: ${firstName} ${lastName} (${email})\nError: ${errText}`);
      res.status(200).json({ ok: false, error: 'GHL submission failed' });
      return;
    }

    // Log successful submission
    console.log(JSON.stringify({
      _type: 'intake_submission',
      contactId,
      variant,
      qualified,
      smallGroup,
      gymType,
      knelpunt,
      goal,
      utm_source,
      utm_campaign,
    }));

    // Forward to GHL webhook to trigger tracking workflow (tags + n8n)
    const webhookUrl = process.env.INTAKE_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _type: 'intake_submission',
          contactId,
          qualified,
          ...req.body,
        }),
      }).catch(() => {});
    }

    res.status(200).json({ ok: true, contactId });
  } catch (err) {
    console.error('Submit error:', err.message);
    await sendAlert(`🚨 **Intake API crash**\n${err.message}`);
    res.status(200).json({ ok: false, error: 'Internal error' });
  }
}
