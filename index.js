const { nextISSTimesForMyLocation } = require('./iss');
const { printPassTimes } = require('./print_passTimes');





nextISSTimesForMyLocation((error, passTimes) => {

  if (error) {
    console.log('It didn\'t work!', error);
    return;
  }

  printPassTimes(passTimes);

});

