'use strict';

var handler = require('./handler');

/**
 * Exports: ROUTES
 */
module.exports = [{
    method: ['GET'],
    path: '/check',
    handler: handler.header
}];