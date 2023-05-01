import express from 'express';
import dotenv from 'dotenv';
const cors = require('cors');
import EventSource from 'eventsource';
import path from 'path';

import { Webhooks } from '@octokit/webhooks';

const webhooks = new Webhooks({
    secret: 'zaclouds-test-secret',
});
const webhookProxyUrl = 'https://smee.io/61l4lZyfL9u7CYRG'; // replace with your own Webhook Proxy URL
const source = new EventSource(webhookProxyUrl);
source.onmessage = (event) => {
    const webhookEvent = JSON.parse(event.data);

    webhooks
        .verifyAndReceive({
            id: webhookEvent['x-request-id'],
            name: webhookEvent['x-github-event'],
            signature: webhookEvent['x-hub-signature'],
            payload: webhookEvent.body,
        })
        .catch(console.error);
};

dotenv.config();

import { fetchAllRoutes } from './routes/allRoutes';

export const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(cors());
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
//env variable for the port
const port = process.env.PORT || 80;

// allRoutes file in routes folder
fetchAllRoutes(app);

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
