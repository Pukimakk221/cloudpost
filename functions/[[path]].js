export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const p = searchParams.get('p');
  let u = 'https://google.com', t = '', i = '', d = '';

  if (p) {
    try {
      const decoded = atob(p);
      const params = new URLSearchParams(decoded);
      u = params.get('u') || u;
      t = params.get('t') || '';
      i = params.get('i') || '';
      d = params.get('d') || '';
    } catch (e) {}
  }

  const ua = context.request.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|Facebot|WhatsApp|Messenger|Twitterbot/i.test(ua);

  if (isBot) {
    return new Response(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${t}</title>
        <meta name="description" content="${d}">
        <meta property="og:title" content="${t}">
        <meta property="og:description" content="${d}">
        <meta property="og:image" content="${i}">
        <meta property="og:type" content="website">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta name="twitter:card" content="summary_large_image">
      </head>
      <body></body>
    </html>`, { 
      headers: { "content-type": "text/html;charset=UTF-8" } 
    });
  }

  return new Response(null, { status: 302, headers: { "Location": u } });
}
