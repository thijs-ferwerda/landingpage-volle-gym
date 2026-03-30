import { put } from '@vercel/blob';

export const config = {
  api: { bodyParser: { sizeLimit: '5mb' } },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { filename, contentType, data } = req.body;

    if (!filename || !data) {
      res.status(400).json({ error: 'Missing filename or data' });
      return;
    }

    const buffer = Buffer.from(data, 'base64');
    const blob = await put(`cv/${Date.now()}-${filename}`, buffer, {
      contentType: contentType || 'application/pdf',
      access: 'public',
    });

    res.status(200).json({ ok: true, url: blob.url });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(200).json({ ok: false, error: 'Upload failed' });
  }
}
