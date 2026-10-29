// Service worker do Mapa das Correias: ACESSO PAUSADO.
// Apaga as cópias antigas do app e mostra só a página de pausa.
const C = 'mapa-correias-pausa';
const SHELL = ['./', 'index.html', 'painel.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C && k.indexOf('mapa-correias-') === 0).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== self.location.origin) return;
  e.respondWith(fetch(r, { cache: 'no-store' }).catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
});
