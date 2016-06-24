'use strict';

/**
 * API routes
 */
var Api = require('./api');
var check = require('./check');


var ROUTES = [];

ROUTES = ROUTES.concat(Api)
               .concat(check);
       
/**
 * Exports: ROUTES
 */
module.exports = ROUTES;
