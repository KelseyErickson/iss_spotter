const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = (passTimes) => {

  for (const passTime of passTimes) {

    const datetime = new Date(0);
    datetime.setUTCSeconds(passTime.risetime);
    
    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);

  }


};


nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }

  printPassTimes(passTimes);

});

