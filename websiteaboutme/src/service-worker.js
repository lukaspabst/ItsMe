/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

const VERSION = 'v2';

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST, {
    cacheId: `lukas-pabst-${VERSION}`,
});

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
    ({ request, url }) => {
        if (request.mode !== 'navigate') {
            return false;
        }
        if (url.pathname.startsWith('/_')) {
            return false;
        }
        return !url.pathname.match(fileExtensionRegexp);
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
    ({ url }) =>
        url.origin === self.location.origin &&
        (url.pathname.endsWith('.webp') || url.pathname.endsWith('.svg')),
    new CacheFirst({
        cacheName: `images-${VERSION}`,
        plugins: [new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })],
    })
);

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
