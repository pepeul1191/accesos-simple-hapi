'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const HRL = require('hapi-routes-loader');
const server = new Hapi.Server();
var constants = require('./config/constants');

server.connection({
  host: 'localhost',
  port: 5000,
  routes: {
    cors: true
  }
});

server.ext('onPreResponse', function(request, reply){
  if (request.response.header) {
      request.response.header('Server', 'Ubuntu');
  }
  reply.continue();
});

server.on('response', function (request) {
  if (constants.data['ambiente'] == 'desarrollo'){
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
  }
});

server.register(
  [
    Inert,
    {
      register: HRL,
      options: {
        dirname: __dirname, //must be a string with a root path
        pathRoutes: '/routes'
      }
    },

  ], (err) => {
  server.start((err) => {
    console.log('Running web app at: ' + server.uri);
  });
});
