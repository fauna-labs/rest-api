import faunadb from 'faunadb';
import {customFetch} from './utils.js';

addEventListener('fetch', event => {
    try {
        const request = event.request;
        const url = new URL(request.url);
        if (url.pathname !== '/') {
            return event.respondWith(new Response('Not Found', { status: 404 }));
        } else if (request.method.toUpperCase() === 'POST') {
            return event.respondWith(handleRequest(request));
        } else {
            return event.respondWith(new Response('Method Not Allowed', { status: 405 }));
        }
    } catch (e) {
        return event.respondWith(new Response(e.message, { status: 500 }));
    }
});

async function handleRequest(request) {

    try {
        const secret = request.headers.get('X-Fauna-Secret');
        const body = await request.json();
        const udf = body.function;
        const args = body.arguments;

        const faunaClient = new faunadb.Client({
            secret: secret,
            fetch: customFetch
        });

        const { Call } = faunadb.query;

        const result = await faunaClient.query(
            Call(udf, args)
        );

        return new Response(result, { status: 200 });
    } catch (e) {
        return new Response(e.message, { status: 500 });
    }
}
