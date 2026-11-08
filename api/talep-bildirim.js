/**
 * Yeni teklif talebi geldiğinde acentenin WhatsApp numarasına otomatik mesaj gönderir.
 * Servis: CallMeBot (ücretsiz). Vercel > Settings > Environment Variables:
 *   CALLMEBOT_APIKEY       -> CallMeBot'un WhatsApp'tan gönderdiği apikey
 *   WHATSAPP_NOTIFY_PHONE  -> Bildirimin gideceği numara (varsayılan +905343914425)
 */

const ALLOWED_FIELDS = [
  'Sigorta Türü',
  'Ad',
  'Soyad',
  'Telefon',
  'TC Kimlik No',
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

  const apikey = process.env.CALLMEBOT_APIKEY;
  const phone = process.env.WHATSAPP_NOTIFY_PHONE || '+905343914425';
  if (!apikey) {
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

  const lines = ALLOWED_FIELDS.filter((key) => typeof body[key] === 'string' && body[key].trim())
    .map((key) => `${key}: ${String(body[key]).trim().slice(0, 120)}`);

  if (!body['Ad'] || !body['Telefon']) {
    res.status(400).json({ ok: false, reason: 'missing-fields' });
    return;
  }

  const text = ['🔔 Yeni teklif talebi (adamarmarasigorta.com.tr)', '', ...lines].join('\n');

  try {
    const url =
      'https://api.callmebot.com/whatsapp.php?phone=' +
      encodeURIComponent(phone) +
      '&text=' +
      encodeURIComponent(text) +
      '&apikey=' +
      encodeURIComponent(apikey);
    const response = await fetch(url);
    res.status(200).json({ ok: response.ok });
  } catch {
    res.status(200).json({ ok: false, reason: 'send-failed' });
  }
}
