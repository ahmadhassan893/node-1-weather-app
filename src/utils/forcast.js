const request = require("request");
const roundNum = require("./roundNum");

const forcast = function(long, lat, callback) {
  const url = `https://api.darksky.net/forecast/01f506d26524b616800ce3bffd3911d9/${long},${lat}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(undefined, {
        temprature: roundNum((5 / 9) * (body.currently.temperature - 32))
      });
    }
  });
};
module.exports = forcast;
