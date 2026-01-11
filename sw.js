const CACHE_NAME = 'trip-planner-v7'; 
const URLS_TO_CACHE = [
  './',
  './manifest.json',
  'https://unpkg.com/vue@3/dist/vue.global.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))));
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // 繞過驗證請求，防止 Safari 登入跳轉失敗
  if (url.search || url.pathname.includes('__auth')) return;
  event.respondWith(caches.match(event.request).then(res => res || fetch(event.request)));
});