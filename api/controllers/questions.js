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
      var analysed = Service.Analyser.analyse(message);
      console.log(analysed)
      console.log('---')
      Service.ResponseBuilder.build(analysed).then((message) => {
        cb(analysed, message);
      });      
    }
  }
};