const payload = JSON.stringify({
    data: [
      {
        event_name: body.event_name || 'Lead',
        event_time: body.event_time || Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://project-6mebk.vercel.app',
        user_data: {
          client_user_agent: body.user_agent || '',
          client_ip_address: req.headers['x-forwarded-for'] || ''
        }
      }
    ],
    test_event_code: 'TEST69821'
  });
