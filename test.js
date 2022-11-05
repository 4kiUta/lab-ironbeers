const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

punkAPI.getBeers().then((beersArray) => {
    console.log(beersArray)
}
)