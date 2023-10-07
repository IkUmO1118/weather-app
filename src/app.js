const path = require('path');
const express = require('express');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../templates/views'));

app.get('', (req, res) => {
  res.render('base', {
    title: 'Weather',
    name: 'Ikumo takahashi',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Ikumo takahashi',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpTxt: 'This is some helpful text.',
    title: 'Help',
    name: 'Ikumo takahashi',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: 'You must provide a address term',
    });
  }

  geoCode(address, (err, { lat, lng, location } = {}) => {
    if (err) return res.send({ err });

    forecast(lat, lng, location, (err, data) => {
      if (err) {
        return res.send({ err });
      }
      const { forecast, temperature } = data;
      res.send({
        forecast,
        location,
        address,
        temperature,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a serch term',
    });
  } else {
    const query = req.query.search;
    console.log(query);
    res.send({
      products: [],
    });
  }
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ikumo takahashi',
    msg: 'Help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Ikumo takahashi',
    msg: 'Page not found!',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
