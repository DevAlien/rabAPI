var queryBuilder = require('./QueryBuilder');
var db = require('../helpers/orient');

class QueryBuilder {
  build(analysed) {
    if (analysed.ofWhat) {
      return this.buildPlace(analysed);
    }
  }

  buildPlace(analysed) {
    let query = queryBuilder.build(analysed);
    
    if (analysed.what === 'orario') {
      return this.buildTime(analysed, query);
    }
    if (analysed.what === 'informazioni') {
      return this.buildInformations(analysed, query);
    }
  }
  
  buildInformations(analysed, query) {
    return db.query(query).then((data) => {
      return new Promise((resolve, reject) => {
        resolve({results: data.length, raw: data});
      });
    });
  }

  buildTime(analysed, query) {
    let msg, message, time;

    return db.query(query).then((data) => { 
      msg = "Ho trovato " + data.length + " risultat" + ((data.length === 1) ? 'o' : 'i') + "\n";
      data.forEach((d) => {
        d = this.dataArrayToString(d);
        message = "\n" + d.name + " in " + d.address + (analysed.deep ? (' ' + d.cityName) : '') + "\n";
        time = JSON.parse(d.time);
        time = time[this.getToday()];
        if (time.length === 0) {
          message = message + 'Oggi è chiuso';
        } else {
          message += this.printTime(time) + "\n";
        }
        msg += message;
      });

      return new Promise((resolve, reject) => {
        resolve({results: data.length, message: msg, raw: data});
      })
    });
  }

  dataArrayToString(data) {
    if (Array.isArray(data.name)) {
      data.name = data.name[0];
    }
    if (Array.isArray(data.address)) {
      data.address = data.address[0];
    }
    if (Array.isArray(data.time)) {
      data.time = data.time[0];
    }
    if (Array.isArray(data.cityName)) {
      data.cityName = data.cityName[0];
    }

    return data;
  }

  printTime(time) {
    let times = [];

    time.forEach((t) => {
      times.push('dalle ' + t.Start + ' alle ' + t.Finish);
    })

    return 'Aperto ' + times.join(' e ');
  }

  getToday() {
    let day = new Date().getDay();

    day = day + 6;
    day = day % 7;

    return day;
  }
}

module.exports = new QueryBuilder();