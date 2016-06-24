'use strict';

/**
 * Server Methods 
 * 
 * Entry point.
 */

const _ganancia = require('./ganancia');


let METHODS = [];

METHODS = METHODS
    .concat({
        name: _ganancia.signature.get,
        method: _ganancia.methods.getGanancia,
        options: _ganancia.extra
    })
    .concat({
        name: _ganancia.signature.set,
        method: _ganancia.methods.setGanancia,
        options: _ganancia.extra
    });

/**
 * Exports
 */

module.exports = METHODS;