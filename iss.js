const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const IP = JSON.parse(body);
    
    callback(null, IP.ip);

  });


};

module.exports = { fetchMyIP };