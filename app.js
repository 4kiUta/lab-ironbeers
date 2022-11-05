const express = require('express');

const hbs = require('hbs');
const { request } = require('http');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials')
// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// Create the beers route 
app.get('/beers', (req, res) => {

  punkAPI.getBeers()
    .then((beersArray) => {
      res.render('beers', { beersArray: beersArray })
    })
    .catch((error) => {
      console.log(error)
    })

})



// get random beers route 
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((randomBeer) => {
      const beer = randomBeer[0] // because we get an array of objects 
      res.render('random-beer', beer)
    }).catch((error) => {
      console.log(error)
    })
})

app.get('/beer/:id', (req, res) => { // go to a specific route

  const id = req.params.id;

  punkAPI.getBeer(id)
    .then((beerInfo) => {
      const beer = beerInfo[0]
      res.render('oneBeer', beer)
    })
    .catch((error) => {
      console.log(error)
    })

})



app.listen(3000, () => console.log('🏃‍ on port 3000'));
