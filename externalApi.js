'use strict';
const request = require('request');
const API_URL = 'https://fourtytwowords.herokuapp.com/';
const API_KEY = '1ce8673914f5f154b52e96bdf84c7bac9d16ad3dbcd4824d6842320ca41983252c8226fef084b6cf6ff9511ce37fba95bac5c115af23695d0d32e81f70debdb3bb61c89c19dba960720269d67e7c3410';
const externalApi = {
    hitApi: function (api, word = '') {
        let url = API_URL;
        if (api == 'random') {
            url += 'words/randomWord';
        } else {
            url += 'word/' + word + '/' + api;
        }
        var options = {
            method: 'GET',
            url: url,
            qs: {api_key: API_KEY},
            form: false
        };
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                resolve(JSON.parse(body));
            });
        });

    }
}

module.exports = externalApi;