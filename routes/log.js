'use strict';

var db = require('../config/database');
var dateFormat = require('dateformat');

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
      db.conn.find('logs', {'usuario_id': request.params.usuario_id}, function(err, cursor, count) {
        if (err) {
          console.error(err);
          return;
        }
        var rs = [];
        while (cursor.next()) {
          var date = new Date(cursor.field('momento'));
          var temp = dateFormat(date, 'yyyy-mm-dd, HH:MM:ss');
          rs.push(temp);
        }
        cursor.close();
        reply(rs);
      });
    }
  }
];