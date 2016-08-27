const cities = require('./cities.json');
const removeDiacritics = require('./helpers/removeDiacritics');

class Cities {

  constructor() {
    this.loadCities();
  }

  loadCities() {
    this.cities = [];
    cities.map((a) => {
      if (a.region.toLowerCase() === 'ti') {
        a.normalizedCity = this.normalizeCity(a.city);
        this.cities.push(a);
      }
    });
  }

  normalizeCity(city) {
    city = removeDiacritics(city);
    city = city.toLowerCase();

    return city;
  }

  checkCity(sentence) {
    let city = false;
    this.cities.forEach((t) => {
      if (sentence.indexOf(t.normalizedCity) !== -1) {
        city = t.city;
      }
    });

    return city;
  }
}

module.exports = new Cities();