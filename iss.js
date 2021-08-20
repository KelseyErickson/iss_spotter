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

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
      
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }


    const {latitude, longitude} = JSON.parse(body);
  

    callback(null, {latitude, longitude});

  });



};

const fetchISSFlyOverTimes = (coordinates, callback) => {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {

    if (error) {
      return callback(error, null);
      
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching fly over times for coordinates. Response: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response

    callback(null, passes);
  

  });
 

};


const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {

    if (error) {
      return callback(error, null);
      
    }
    
    fetchCoordsdByIP(ip, (error, coordinates) => {

      if (error) {
        return callback(error, null);
        
      }

     
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {

        if (error) {
          return callback(error, null);
          
        }


        callback(null, passTimes);

       });
    
    });
  
  });



  



}

module.exports = { nextISSTimesForMyLocation };