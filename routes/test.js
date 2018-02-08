'use strict';

var db = require('../config/database');
var middleware = require('../config/middleware');

module.exports = [
  {
    method: 'GET',
    path: 'conexion',
    config: {
      auth: false,
      pre: [
        { method: middleware.setHeaders},
      ],
    },
    handler: function (request, reply) {
      reply('ok');
    }
  },
  {
    method: 'GET',
    path: 'usuario_db',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      db.conn.find('usuarios', {'usuario' : 'pips', 'contrasenia' : '123'}, function(err, cursor, count) {
        if(count == 0){
          var usuario = {
            'usuario' : 'pips',
            'contrasenia' : '123',
            'correo' : 'pips@ulima.edu.pe',
          };
          db.conn.save('usuarios', usuario, function(err, oids) {
            if (err) {
              console.error(err);
              return;
            }
          });
          reply('Se ha creado el usuario de prueba');
        }else{
          reply('El usuario de prueba ya se encuentra creado');
        }
      });

    }
  }
];
