export async function onRequest(context) {
  const url = new URL(context.request.url);
  const u = url.searchParams.get('u') || 'https://google.com';
  const t = url.searchParams.get('t') || 'Loading...';
  const i = url.searchParams.get('i') || '';
  const d = url.searchParams.get('d') || '';

  const ua = context.request.headers.get('user-agent') || '';
  /* Jika yang datang adalah Bot Facebook, kasih dia Meta Tag saja, jangan di-redirect dulu */
  if (ua.includes('facebookexternalhit') || ua.includes('Facebot')) {
    return new Response(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${t}</title>
      <meta property="og:type" content="website">
      <meta property="og:title" content="${t}">
      <meta property="og:description" content="${d}">
      <meta property="og:image" content="${i}">
      <meta property="og:url" content="${url.href}">
    </head>
    <body></body>
    </html>`, { headers: { "content-type": "text/html;charset=UTF-8" } });
  }

  /* Jika yang datang manusia (browser), langsung lempar ke URL tujuan */
  return new Response(`<!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="refresh" content="0;url=${u}">
    <script>window.location.replace("${u}");</script>
  </head>
  </html>`, { headers: { "content-type": "text/html;charset=UTF-8" } });
}
