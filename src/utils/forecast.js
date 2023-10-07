const request = require('postman-request');

const forecast = (lat, lng, location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=946c0a5bd958e6802498b52c5ec82893&query=${lng},${lat}&units=m`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to Weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        forecast: `${location}: ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out.`,
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
