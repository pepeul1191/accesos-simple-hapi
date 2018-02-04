'use strict';

var db = require('../config/database');

module.exports = [
  {
    method: 'POST',
    path: 'crear/{usuario_id}',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var log = {
        'usuario_id' : request.params.usuario_id,
        'momento' : new Date()
      };
      db.conn.save('logs', log, function(err, oids) {
        if (err) {
          console.error(err);
          return;
        }
      });
      reply('Se ha creado una entrada de log al usuario');
    },
  },
  {
    method: 'GET',
    path: 'usuario/{usuario_id}',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      reply(request.params.usuario_id);
    }
  }
];