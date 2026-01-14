export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const p = searchParams.get('p');
  let u, t, i, d;

  if (p) {
    try {
      /* Bongkar kode misterius (Base64 Decode) */
      const decoded = atob(p);
      const params = new URLSearchParams(decoded);
      u = params.get('u') || 'https://google.com';
      t = params.get('t') || 'Loading...';
      i = params.get('i') || '';
      d = params.get('d') || '';
    } catch (e) {
      u = 'https://google.com';
    }
  }

  const ua = context.request.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|Facebot|WhatsApp|Messenger|Twitterbot/i.test(ua);

  if (isBot) {
    return new Response(`<!DOCTYPE html><html><head>
      <meta charset="utf-8">
      <title>${t}</title>
      <meta property="og:title" content="${t}">
      <meta property="og:description" content="${d}">
      <meta property="og:image" content="${i}">
      <meta property="og:type" content="website">
      <meta property="og:image:width" content="1200">
      <meta property="og:image:height" content="630">
      </head></html>`, { headers: { "content-type": "text/html;charset=UTF-8" } });
  }

  /* Dialihkan ke link asli */
  return new Response(null, { status: 302, headers: { "Location": u } });
}
