const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const webhooks = new Webhooks({
    secret: 'mysecret',
});

console.log('lol');
webhooks.onAny(({ id, name, payload }) => {
    console.log(name, 'event received');
});

require('http').createServer(createNodeMiddleware(webhooks)).listen(80);
// can now receive webhook events at /api/github/webhooks
