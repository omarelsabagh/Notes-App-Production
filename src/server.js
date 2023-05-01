const { Webhooks, createNodeMiddleware } = require('@octokit/webhooks');
const webhooks = new Webhooks({
    secret: 'zaclouds-test-secret',
});

webhooks.onAny(({ id, name, payload }) => {
    console.log(name, 'event received');
});

// require('http').createServer(createNodeMiddleware(webhooks)).listen(80);
// can now receive webhook events at /api/github/webhooks
///////////////////////////////////////////////////////
var http = require('http'); // 1 - Import Node.js core module

var server = http.createServer(
    createNodeMiddleware(webhooks),
    function (req, res) {
        // 2 - creating server
    }
);

server.listen(80); //3 - listen for any incoming requests
