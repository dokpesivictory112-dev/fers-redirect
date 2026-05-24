const https = require('https');

module.exports = async function(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const PIXEL_ID = '950535357880062';
  const ACCESS_TOKEN = 'EAGDaJTh2MZCIBRpZBTwrYPrUl4ZBO1w728i5rQC7SYCQdgoCwwSFuP4enKHaDA6XFz1IYcevAhGDhMeZCUQvzy9xLrOKjYsTEoPfRPa5ZAXEZAYpZCZBiHtCmGZCLwwo5sZCq0ZAiGMdxatp9p9ZB9mqMZB6LHe9R31VBSmEc9g1vUWSH42QiZCumxU1FnskKv8WiaLAZDZD';

  const body = req.body;

  const payload = JSON.stringify({
    data: [
      {
        event_name: body.event_name || 'Lead',
        event_time: body.event_time || Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://fersinnova.vercel.app',
        user_data: {
          client_user_agent: body.user_agent || '',
          client_ip_address: req.headers['x-forwarded-for'] || ''
        }
      }
    ]
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'graph.facebook.com',
      path: `/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req2 = https.request(options, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        res.status(200).json({ success: true, fb_response: data });
        resolve();
      });
    });

    req2.on('error', (err) => {
      res.status(500).json({ success: false, error: err.message });
      resolve();
    });

    req2.write(payload);
    req2.end();
  });
};
