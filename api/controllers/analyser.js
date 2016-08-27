'use strict';

module.exports = {
  path: '/analyser',
  model: 'analyser',
  actions: {
    'post /': [
      function (req, res) {
        console.log(req.body)
        Service.ResponseBuilder.build(req.body).then((message) => {
          res.send({analysed: req.body, data: message});
        });
      }
    ],
  },
  sockets: {
    'analyse': function(data, cb) {
      Service.ResponseBuilder.build(data).then((message) => {
        cb(data, message);
      });
    }
  }
};