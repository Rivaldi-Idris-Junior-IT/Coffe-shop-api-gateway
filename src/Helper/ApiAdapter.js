const axios = require('axios').default;

module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        // 5 detik
        timeout: 20000,
    });
}