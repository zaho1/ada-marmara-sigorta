/**
 * Yeni teklif talebi geldiğinde acentenin WhatsApp numarasına otomatik mesaj gönderir.
 * Servis: Whapi.Cloud (gönderici olarak bağlanan WhatsApp hattı üzerinden).
 * Vercel > Settings > Environment Variables:
 *   WHAPI_TOKEN            -> Whapi.Cloud panelindeki API token
 *   WHATSAPP_NOTIFY_PHONE  -> Bildirimin gideceği numara (varsayılan +905343914425)
 */

const ALLOWED_FIELDS = [
  'Sigorta Türü',
  'Ad',
  'Soyad',
  'Telefon',
  'Plaka',
  'İl',
  'İlçe',
  'Mahalle',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  const token = process.env.WHAPI_TOKEN;
  const phone = (process.env.WHATSAPP_NOTIFY_PHONE || '+905343914425').replace(/\D/g, '');
  if (!token) {
    res.status(200).json({ ok: false, reason: 'not-configured' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body && typeof body === 'object' ? body : {};

  if (!body['Ad'] || !body['Telefon']) {
    res.status(400).json({ ok: false, reason: 'missing-fields' });
    return;
  }

  const lines = ALLOWED_FIELDS.filter((key) => typeof body[key] === 'string' && body[key].trim()).map(
    (key) => `*${key}:* ${String(body[key]).trim().slice(0, 120)}`,
  );
  const text = ['🔔 *Yeni teklif talebi* (adamarmarasigorta.com.tr)', '', ...lines].join('\n');

  try {
    const response = await fetch('https://gate.whapi.cloud/messages/text', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ to: phone, body: text }),
    });
    res.status(200).json({ ok: response.ok });
  } catch {
    res.status(200).json({ ok: false, reason: 'send-failed' });
  }
}
