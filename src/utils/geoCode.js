const request = require('postman-request');

const geoCode = (address, callback) => {
  const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiaWt1bW8iLCJhIjoiY2xuM3N1ZThlMGNpdzJrbnczNnE3eWVhdyJ9.Ufw5jqisf5eMimLXInWO6Q&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location! Try another search.', undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[0],
        lng: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
