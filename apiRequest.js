const https = require('https');

async function apiRequest(url) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                resolve(JSON.parse(data));
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    });
}

module.exports = apiRequest;
