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
    let sentenceArray, city = false;
    sentence = sentence.replace(/[^\w\s]/gi, '')
    sentenceArray = sentence.split(' ');
    this.cities.forEach((t) => {
      sentenceArray.forEach((s) => {
        if (s === t.normalizedCity) {
          city = t.city;
        }
      });
    });

    return city;
  }
}

module.exports = new Cities();