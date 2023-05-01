import express from 'express';
import dotenv from 'dotenv';
const cors = require('cors');
const path = require('path');
const { Octokit } = require('@octokit/core');
const octokit = new Octokit();

const asyncFunc = async () => {
    const response = await octokit.request('GET /repos/{owner}/{repo}', {
        owner: 'omarelsabagh',
        repo: 'Notes-App-Production',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    console.log(response);
};

asyncFunc();
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

const port = process.env.PORT || 5000;

// allRoutes file in routes folder
fetchAllRoutes(app);

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
