let switzerlandPois = require('./Switzerland');
let db = require('../api/helpers/orient');
let address;
switzerlandPois.forEach((poi) => {
  if (poi.category === 'Food') {
    console.log(poi.address);
    address = poi.address;
    address = address.split(', ');

    db.class.get('Place').then(function (Place) {
      return Promise.all([
        Place.create({
          name: poi.title,
          address: address[0],
          type: 'ristorante'
        })
      ]);
    }).then((result) => {
      console.log(result)
    });
  }
});