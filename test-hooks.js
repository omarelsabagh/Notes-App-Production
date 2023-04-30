// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: 'YOUR-TOKEN',
});

await octokit.request('GET /repos/omarelsabagh/Notes-App-Production', {
    owner: 'omarelsabagh',
    repo: 'Notes-App-Production',
    headers: {
        'X-GitHub-Api-Version': '2022-11-28',
    },
});
