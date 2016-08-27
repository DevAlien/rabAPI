'use strict';

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
      console.log('aaa')
      cb(JSON.stringify(analized));
    }
  }
};