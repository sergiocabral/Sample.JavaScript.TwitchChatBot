import axios from 'axios';

async function get(url) {
    const response = await axios.get(url);
    return response.data;
}

export default {
    get: get
};
