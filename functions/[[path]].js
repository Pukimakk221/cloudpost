export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const u = searchParams.get('u') || 'https://google.com';
  const t = searchParams.get('t') || 'Loading...';
  const i = searchParams.get('i') || '';
  const d = searchParams.get('d') || ''; // Menangkap Deskripsi

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${t}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content="${t}">
    <meta property="og:description" content="${d}">
    <meta property="og:image" content="${i}">
    <meta property="og:url" content="${u}">
    <meta http-equiv="refresh" content="0;url=${u}">
    <script>window.location.replace("${u}");</script>
  </head>
  <body style="background:#000;"></body>
  </html>`;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" }
  });
}
