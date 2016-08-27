var queryBuilder = require('./QueryBuilder');
var db = require('../helpers/orient');

class QueryBuilder {
  build(analyzed) {
    if (analyzed.ofWhat) {
      return this.buildPlace(analyzed);
    }
  }

  buildPlace(analyzed) {
    let query = queryBuilder.build(analyzed);
    if (analyzed.what === 'orario') {
      return this.buildTime(analyzed, query);
    }
  }

  buildTime(analyzed, query) {
    return db.query(query).then((data) => { 
      var msg = "Ho trovato " + data.length + " risultat" + ((data.length === 1) ? 'o' : 'i') + "\n";
      data.forEach((d) => {
        let message = "\n" + d.name + " in " + d.address + "\n";
        let time = JSON.parse(d.time);
        time = time[this.getToday()];
        if (time.length === 0) {
          message = message + 'Oggi è chiuso';
        } else {
          message += this.printTime(time) + "\n";
        }
        msg += message;
      });

      return new Promise((resolve, reject) => {
        resolve(msg);
      })
    });
  }

  printTime(time) {
    var times = [];
    time.forEach((t) => {
      times.push('dalle ' + t.Start + ' alle ' + t.Finish);
    })

    return 'Aperto ' + times.join(' e ');
  }

  getToday() {
    var day = new Date().getDay();
    day = day + 6;
    day = day % 7;

    return day;
  }
}

module.exports = new QueryBuilder();