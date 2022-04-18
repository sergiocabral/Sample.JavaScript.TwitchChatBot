const fetch = require('node-fetch');

async function apiRequest(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

module.exports = apiRequest;
