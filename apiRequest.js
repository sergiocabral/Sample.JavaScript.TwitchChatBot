const axios = require('axios');

async function apiRequest(url) {
    const response = await axios.get(url);
    return response.data;
}

module.exports = apiRequest;
