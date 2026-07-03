// Vercel Function — proxy da Conversions API da Meta.
// O token fica em variável de ambiente (META_CAPI_TOKEN), nunca no HTML.
// O navegador manda o evento pra cá; a gente anexa IP/User-Agent do request
// e repassa pro Graph API. Dedup com o Pixel continua pelo event_id.

const PIXEL_ID = '246033433475773';
const ALLOWED_EVENTS = ['PageView', 'ViewContent', 'AddToCart'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }
  const token = process.env.META_CAPI_TOKEN;
  if (!token) { res.status(204).end(); return; } // sem env, vira no-op

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const events = Array.isArray(body && body.data) ? body.data.slice(0, 10) : [];

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const ua = req.headers['user-agent'] || '';

  const data = events
    .filter((e) => e && ALLOWED_EVENTS.includes(e.event_name))
    .map((e) => {
      const ud = (e.user_data && typeof e.user_data === 'object') ? e.user_data : {};
      const userData = { client_user_agent: ua, country: 'br' };
      if (ip) userData.client_ip_address = ip;
      if (ud.external_id) userData.external_id = String(ud.external_id).slice(0, 128);
      if (ud.fbp) userData.fbp = String(ud.fbp).slice(0, 128);
      if (ud.fbc) userData.fbc = String(ud.fbc).slice(0, 256);
      return {
        event_name: e.event_name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: String(e.event_id || '').slice(0, 64),
        event_source_url: String(e.event_source_url || '').slice(0, 512),
        action_source: 'website',
        user_data: userData,
        custom_data: (e.custom_data && typeof e.custom_data === 'object') ? e.custom_data : {},
      };
    })
    .filter((e) => e.event_id);

  if (!data.length) { res.status(204).end(); return; }

  try {
    await fetch('https://graph.facebook.com/v21.0/' + PIXEL_ID + '/events?access_token=' + token, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
  } catch (e) { /* tracking nunca derruba nada */ }
  res.status(204).end();
};
