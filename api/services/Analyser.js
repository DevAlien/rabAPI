var natural = require('natural');
var cities = require('../../lib/Cities.js');
var classifier = new natural.LogisticRegressionClassifier();
var placesClassifier = new natural.LogisticRegressionClassifier();

class Analyser {
  constructor() {
    this.trainClassifier();
    this.trainPlacesClassifier();
  }

  trainClassifier() {
    classifier.addDocument('orario', 'orario');
    classifier.addDocument('che ora', 'orario');
    classifier.addDocument('a che ora', 'orario');
    classifier.addDocument('a che ora chiude', 'orario');
    classifier.addDocument('a che ora apre', 'orario');
    classifier.addDocument('quando', 'orario');
    classifier.addDocument('fino a', 'orario');
    classifier.addDocument('apertura', 'orario');
    classifier.addDocument('chiusura', 'orario');

    classifier.addDocument('Dove posso', 'dove');
    classifier.addDocument('posso andare', 'dove');
    classifier.addDocument('dove trovo', 'dove');
    classifier.addDocument('dove', 'dove');
    classifier.addDocument('ci sono', 'essere');
    classifier.addDocument('c\'è il', 'essere');
    classifier.addDocument('c\'è la', 'essere');
    classifier.addDocument('c\'è un', 'essere');
    classifier.addDocument('c\'è una', 'essere');
    classifier.train();
  }
  
  trainPlacesClassifier() {
    placesClassifier.addDocument('posta', 'Posta');
    placesClassifier.addDocument('cinema', 'Cinema');
    placesClassifier.addDocument('gommista', 'Gommista');
    placesClassifier.addDocument('cambiare gomme', 'Gommista');
    placesClassifier.addDocument('comune', 'Comune');

    placesClassifier.train();
  }

  getHighestClassFromSentence(sentence) {
    return this.getHighestClassification(classifier.getClassifications(sentence));
  }

  getHighestClassification(classifications) {
    var res = { value: 0};
    classifications.forEach((c) => {
      console.log(c)
      if (c.value > res.value) {
        res = c;
      }
    });

    return res;
  }

  analyse(sentence) {
    var result = {};
    var what = this.getHighestClassFromSentence(sentence);
    if (what.value > 0.5) {
      result.what = what.label;
    }

    var ofWhat = this.getHighestClassification(placesClassifier.getClassifications(sentence));
    if (ofWhat.value > 0.5) {
      result.ofWhat = ofWhat.label;
    }
    var normalized = cities.normalizeCity(sentence);
    
    var city = cities.checkCity(normalized);
    if (city) {
      result.city = city;
    }

    return result;
  }
}

module.exports = new Analyser();