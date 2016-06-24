'use strict';

/**
 * API routes
 */
var Api = require('./api');
var check = require('./check');
var ganancia = require('./ganancia');


var ROUTES = [];

ROUTES = ROUTES.concat(Api)
               .concat(check)
               .concat(ganancia);
       
/**
 * Exports: ROUTES
 */
module.exports = ROUTES;
