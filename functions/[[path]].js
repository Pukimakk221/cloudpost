export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const u = searchParams.get('u'); // URL Tujuan
  const t = searchParams.get('t'); // Judul
  const i = searchParams.get('i'); // Gambar

  const ua = context.request.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|WhatsApp|Twitterbot|Pinterest|Googlebot|TelegramBot/i.test(ua);

  if (u && isBot) {
    return new Response(
      `<!DOCTYPE html><html><head>
      <title>${t}</title>
      <meta property="og:title" content="${t}">
      <meta property="og:image" content="${i}">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      </head></html>`,
      { headers: { "content-type": "text/html" } }
    );
  } else if (u) {
    return Response.redirect(u, 302);
  }

  return new Response("Service Active. Use Bookmarklet to generate links.");
}
