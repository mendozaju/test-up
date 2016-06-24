'use strict';

var handler = require('./handler');

/**
 * Exports: ROUTES
 */
module.exports = [{
    method: ['GET'],
    path: '/ganancia',
    handler: handler.getGanancia
},
{
    method: ['POST'],
    path: '/ganancia',
    handler: handler.setGanancia
}];