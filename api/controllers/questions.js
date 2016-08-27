'use strict';
var db = require('../helpers/orient');

module.exports = {
  path: '/questions',
  model: 'questions',
  actions: {
    'get /': [
      function (req, res) {
        var accessToken = Service.token.sign({ id: 'asd', scopes: ['master'] });
        res.send(accessToken);
        // console.log(Service.Analyser.analyse());
        
      }
    ],
  },
  sockets: {
    'send': function(message, cb) {
      var analized = Service.Analyser.analyse(message);
      console.log(analized)
      console.log('---')
      Service.ResponseBuilder.build(analized).then((message) => {
        cb(analized, message);
      });
      // if (analized.ofWhat) {
      //   console.log("select * from " + analized.what + " where inV().type = '" + analized.ofWhat + "' and outV().name = '" +analized.city + "'")
      //     var a = db.query("select * from " + analized.what + " where inV().type = '" + analized.ofWhat + "' and outV().name = '" +analized.city + "'").then((data) => {
      //       var msg = "Ho trovato " + data.length + " risultati\n";
      //       msg = '';
      //       data.forEach((d) => {
      //         console.log(d.data)
      //         var data = JSON.parse(d.data);
      //         msg += d.name + " apre alle " + data.from + " e chiude alle " + data.to;
      //       })
      //       if (data.length === 0) {
      //         msg = 'Purtroppo non ho trovato alcun risultato. Cerco di cercare questa informazione per te nelle prossime ore.';
      //       }
      //       cb(analized, msg);
      //     });
      //   } else {
          
      //   }
      
    }
  }
};