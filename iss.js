const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org/?format=json', (error, response, body) => {

    if (error) {
      return callback(error, null);
      
    }

    if (response.statusCode !== 200) {
      
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    
    callback(null, ip);

  });


};



const fetchCoordsdByIP = (ip, callback) => {

  request(`https://freegeoip.app/json/45`, (error, response, body) => {

    if (error) {
      return callback(error, null);
      
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    const parsedData = JSON.parse(body);
    const data = { latitude: parsedData.latitude, longitude: parsedData.longitude };

    callback(null, data);

  });



};

module.exports = { fetchMyIP, fetchCoordsdByIP };