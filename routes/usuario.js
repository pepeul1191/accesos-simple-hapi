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
    path: 'contrasenia',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var correo = request.query.correo;
      db.conn.find('usuarios', {'correo' : correo}, function(err, cursor, count) {
        if(count == 0){
          reply(count);
        }else{
          var contrasenia = null;
          while (cursor.next()) {
            contrasenia = cursor.field('contrasenia');
          }
          cursor.close();
          reply(contrasenia);
        }
      });
    },
  },
  {
    method: 'POST',
    path: 'nombre_repetido',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var usuario_id = data['id'];
      var usuario = data['usuario'];
      if(usuario_id == 'E'){
        db.conn.find('usuarios', {'usuario' : usuario}, function(err, cursor, count) {
          reply(count);
        });
      }else{
        db.conn.find('usuarios', {'usuario' : usuario, 'id' : usuario_id}, function(err, cursor, count) {
          if(count == 1){
            reply(0);
          }else{
            db.conn.find('usuarios', {'usuario' : usuario, 'id' : usuario_id}, function(err, cursor, count) {
              reply(count);
            });
          }
        });
      }
    },
  },
  {
    method: 'POST',
    path: 'correo_repetido',
    config: {
      auth: false
    },
    handler: function (request, reply) {
      var data = JSON.parse(request.query.data);
      var usuario_id = data['id'];
      var correo = data['correo'];
      if(usuario_id == 'E'){
        db.conn.find('usuarios', {'correo' : correo}, function(err, cursor, count) {
          reply(count);
        });
      }else{
        db.conn.find('usuarios', {'correo' : correo, 'id' : usuario_id}, function(err, cursor, count) {
          if(count == 1){
            reply(0);
          }else{
            db.conn.find('usuarios', {'correo' : correo, 'id' : usuario_id}, function(err, cursor, count) {
              reply(count);
            });
          }
        });
      }
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
          var temp = {
            'id' : cursor.field('_id'),
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
