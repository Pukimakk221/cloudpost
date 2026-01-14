export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  
  /* Menangkap data dari link yang dibuat bookmarklet */
  const targetUrl = searchParams.get('u') || 'https://google.com';
  const title = searchParams.get('t') || 'Loading...';
  const image = searchParams.get('i') || '';

  /* HTML Khusus untuk Bot Facebook agar muncul Preview */
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="Klik untuk melihat selengkapnya...">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${targetUrl}">
    
    <meta http-equiv="refresh" content="0;url=${targetUrl}">
    <script>window.location.replace("${targetUrl}");</script>
  </head>
  <body>
    Redirecting to <a href="${targetUrl}">${targetUrl}</a>...
  </body>
  </html>`;

  return new Response(html, {
    headers: { "content-type": "text/html;charset=UTF-8" },
  });
}
