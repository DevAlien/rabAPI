'use strict';
var db = require('../helpers/orient');

module.exports = {
  path: '/questions',
  model: 'questions',
  actions: {
    'post /': [
      function (req, res) {
        let analysed = Service.Analyser.analyse(req.body.message);
        Service.ResponseBuilder.build(analysed).then((message) => {
          res.send({analysed: analysed, message: message});
        });
      }
    ],
  },
  sockets: {
    'send': function(message, cb) {
      let analysed = Service.Analyser.analyse(message);
      Service.ResponseBuilder.build(analysed).then((message) => {
        cb(analysed, message);
      });      
    }
  }
};