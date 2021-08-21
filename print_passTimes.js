const printPassTimes = (passTimes) => {

  for (const passTime of passTimes) {

    const datetime = new Date(0);
    datetime.setUTCSeconds(passTime.risetime);
    
    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);

  }


};

module.exports = { printPassTimes };