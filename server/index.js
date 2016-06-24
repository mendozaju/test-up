'use strict';


var Hapi = require('hapi');
var Inert = require('inert');
var routes = require('./routes');

var serverMethods = require('./methods');

var server = new Hapi.Server();


server.connection({ port: process.env.PORT || 3000 });
server.register(Inert);
server.route(routes);
server.method( serverMethods );

server.start(function() {
    console.info('Hapijs server running at ' +
        server.info.uri + ' on port [' +
        server.info.port + '] in [' +
        process.env.NODE_ENV + '] mode'
    );
});
