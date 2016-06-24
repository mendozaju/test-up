'use strict';

var gananciaGeneral = 0;

var _ganancia = {};


_ganancia.signature = {};
_ganancia.signature.get = 'getGanancia';
_ganancia.signature.set = 'setGanancia';


/**
 * Retorna la ganancia
 **/
var _getGanancia = function( next ) {    
    next(null,gananciaGeneral);
};

var _setGanancia = function(nuevaGanancia , next){
    console.log(`Se setea la nueva ganancia a:[${nuevaGanancia}]`);
    gananciaGeneral = nuevaGanancia;
    next(null, true);
}


/**
 * Objeto handler del modulo
 **/
_ganancia.methods = {
    getGanancia: _getGanancia,
    setGanancia: _setGanancia
};

_ganancia.extra = {};

/**
 * Exports del modulo
 **/
module.exports = _ganancia;
