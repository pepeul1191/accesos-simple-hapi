'use strict';

var db = require('../config/database');

module.exports = [
  {
  method: 'POST',
    path: 'acceder',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var usuario = request.query.usuario;
      var contrasenia = request.query.contrasenia;
      db.conn.find('usuarios', {'usuario' : usuario, 'contrasenia' : contrasenia}, function(err, cursor, count) {
        reply(count);
      });
    },
  },
  {
    method: 'GET',
    path: 'listar',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var usuario = {
        'usuario' : 'pips',
        'contrasenia' : '123',
        'correo' : 'pips@ulima.edu.pe',
      };
      db.conn.find('usuarios', function(err, cursor, count) {
        if (err) {
          console.error(err);
          return;
        }
        var rs = [];
        while (cursor.next()) {
          //console.log(cursor.field("name") + " likes toys!");
          var temp = {
            'usuario' : cursor.field('usuario'),
            'correo' : cursor.field('correo'),
          }
          rs.push(temp);
        }
        cursor.close();
        reply(rs);
      });
    }
  }
];