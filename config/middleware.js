const setHeaders = function (request, reply) {
  //request.response.header('Server', 'Ubuntu');
  return reply.continue();
};

exports.setHeaders= setHeaders;
