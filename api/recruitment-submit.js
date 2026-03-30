/**
 * Recruitment Form Submission Endpoint
 *
 * Creates a contact in GoHighLevel with full UTM attribution,
 * then fires webhooks for workflow triggers and notifications.
 *
 * Required Vercel env vars:
 *   GHL_API_KEY       — GoHighLevel API key (Location or Agency level)
 *   GHL_LOCATION_ID   — GoHighLevel Location ID
 *
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

  // Recruitment uses its own GHL subaccount (Volle Gym - Recruitment)
  const GHL_API_KEY = process.env.GHL_RECRUITMENT_API_KEY || process.env.GHL_API_KEY;
  const GHL_LOCATION_ID = process.env.GHL_RECRUITMENT_LOCATION_ID || process.env.GHL_LOCATION_ID;

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    console.error('Missing GHL_RECRUITMENT_API_KEY or GHL_RECRUITMENT_LOCATION_ID env vars');
    await sendAlert('🚨 **Recruitment API fout**\nGHL_RECRUITMENT_API_KEY of GHL_RECRUITMENT_LOCATION_ID ontbreekt in Vercel env vars.');
    res.status(200).json({ ok: false, error: 'GHL not configured' });
    return;
  }

  try {
    const {
      firstName: rawFirstName, lastName: rawLastName, name, email, phone,
      sollicitatie_type, form_type, role, location, motivation, portfolio, cvUrl,
      // UTM & tracking data
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      fbclid, gclid, gbraid, wbraid,
      landingUrl, referrer, userAgent,
      fbc, fbp, gaClientId, gaSessionId,
    } = req.body;

    // Use separate first/last name fields, fall back to splitting full name
    const firstName = rawFirstName || (name || '').trim().split(/\s+/)[0] || '';
    const lastName = rawLastName || (name || '').trim().split(/\s+/).slice(1).join(' ') || '';

    // Build attributionSource (same structure as intake form)
    const clientIp = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '').split(',')[0].trim();
    const clientUA = userAgent || req.headers['user-agent'] || '';

    const attributionSource = {
      url: landingUrl || 'https://www.vollegym.nl/solliciteren',
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

    // Map form fields to GHL custom fields (Volle Gym - Recruitment subaccount)
    const customFields = [
      { id: 'QCc1BQrN78OpOzwuJfco', value: sollicitatie_type === 'hq' ? 'Volle Gym HQ' : 'Partner' },
      { id: 'KsGwWv9Xvl9lY5tfMBHT', value: role || null },
      { id: 'jcklTZjSTWp6rLkyUCSH', value: motivation || null },
      { id: 'unFWQu02FIJAhHJJujHe', value: portfolio || null },
      { id: 'sL9kbyTS0rt2XuNboTpO', value: location || null },
      { id: 'vnKnJmLnkufh1FrsBI9e', value: cvUrl || null },
    ].filter(f => f.value);

    const ghlPayload = {
      firstName,
      lastName,
      email,
      phone,
      locationId: GHL_LOCATION_ID,
      source: utm_source === 'facebook' || utm_source === 'ig' ? 'Facebook' : utm_source || 'Website',
      tags: [
        sollicitatie_type === 'hq' ? 'recruitment-hq' : 'recruitment-partner',
      ],
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
          await sendAlert(`🚨 **Recruitment API fout**\nGHL contact update mislukt (${updateRes.status})\n\nSollicitant: ${name} (${email})\nError: ${errText}`);
          res.status(200).json({ ok: false, error: 'GHL update failed' });
          return;
        }
      } else {
        console.error('GHL duplicate but no contactId in response');
        await sendAlert(`🚨 **Recruitment API fout**\nDuplicate contact maar geen contactId in GHL response\n\nSollicitant: ${name} (${email})`);
        res.status(200).json({ ok: false, error: 'GHL submission failed' });
        return;
      }
    } else {
      const errText = await response.text();
      console.error('GHL API error:', response.status, errText);
      await sendAlert(`🚨 **Recruitment API fout**\nGHL contact aanmaken mislukt (${response.status})\n\nSollicitant: ${name} (${email})\nError: ${errText}`);
      res.status(200).json({ ok: false, error: 'GHL submission failed' });
      return;
    }

    // Log successful submission
    console.log(JSON.stringify({
      _type: 'recruitment_submission',
      contactId,
      sollicitatie_type,
      role: role || null,
      location: location || null,
      utm_source,
      utm_campaign,
    }));

    // Fire webhooks for workflow triggers and notifications (fire and forget)
    const webhookPayload = {
      _type: 'recruitment_submission',
      contactId,
      name, email, phone,
      sollicitatie_type,
      form_type,
      role: role || null,
      location: location || null,
      portfolio: portfolio || null,
      cvUrl: cvUrl || null,
      motivation,
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    };

    const webhookTargets = [
      { name: 'GHL Workflow 1', url: 'https://services.leadconnectorhq.com/hooks/0ybaSuLNKF7ssKOjBqwH/webhook-trigger/48120e14-7b1b-435c-866e-c09b486373a2' },
      { name: 'GHL Workflow 2', url: 'https://services.leadconnectorhq.com/hooks/0ybaSuLNKF7ssKOjBqwH/webhook-trigger/ce002d9c-3d98-4948-b7d4-7740955a9db1' },
      { name: 'N8N Notificatie', url: 'https://n8n.vollegym.nl/webhook/recruitment-website-notify' },
    ];

    const webhookResults = await Promise.allSettled(
      webhookTargets.map(t => fetch(t.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(webhookPayload),
      }))
    );

    // Check for failed webhooks and alert
    const failures = [];
    for (let i = 0; i < webhookResults.length; i++) {
      const result = webhookResults[i];
      const target = webhookTargets[i];
      if (result.status === 'rejected') {
        failures.push(`${target.name}: ${result.reason?.message || 'Network error'}`);
      } else if (!result.value.ok) {
        failures.push(`${target.name}: HTTP ${result.value.status}`);
      }
    }
    if (failures.length > 0) {
      await sendAlert(`⚠️ **Recruitment webhooks gefaald**\nSollicitant: ${firstName} ${lastName} (${email})\nContact ID: ${contactId}\n\nGefaalde webhooks:\n${failures.join('\n')}`);
    }

    res.status(200).json({ ok: true, contactId });
  } catch (err) {
    console.error('Recruitment submit error:', err.message);
    await sendAlert(`🚨 **Recruitment API crash**\n${err.message}`);
    res.status(200).json({ ok: false, error: 'Internal error' });
  }
}
