'use strict';

var db = require('../config/database');
var constants = require('../config/constants');
var middleware = require('../config/middleware');
var helpers = require('../config/helpers');

module.exports = [
  {
    method: 'GET',
    path: 'conexion',
    config: {
      auth: false,
      pre: [
        { method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      reply('ok');
    }
  },
  {
    method: 'GET',
    path: 'view',
    config: {
      auth: false,
      pre: [
        { method: middleware.demo},
      ],
    },
    handler: function (request, reply) {
      var csss = [
        'bower_components/bootstrap/dist/css/bootstrap.min',
        'bower_components/font-awesome/css/font-awesome.min'
      ];
      var jss = [
        'bower_components/jquery/dist/jquery.min',
        'bower_components/bootstrap/dist/js/bootstrap.min'
      ];
      var locals = {
        constants: constants.data,
        title: 'Test EJS Title',
        helpers: helpers,
        csss: csss,
        jss: jss,
      };
      reply.view('test/index', locals);
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
