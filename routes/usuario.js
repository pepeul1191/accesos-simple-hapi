'use strict';

var db = require('../config/database');

module.exports = [
  {
  method: 'POST',
    path: 'acceder',
    config: {
      auth: false
    },
    //http://localhost:3035/reporte/datos_dia?sensor_id=7&dia=2017.12.26
    handler: function (request, reply) {
      reply('usuario/acceder');
    },
  },
];