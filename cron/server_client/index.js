'use strict';
var Wreck = require('wreck');

exports.setNuevaGanancia = function(nuevaGanancia){
    console.log(`Enviando la nueva ganancia:[${nuevaGanancia}]`);
    
     //http://localhost:3000/ganancia
     //https://test-money.herokuapp.com
     Wreck.post("https://test-money.herokuapp.com/ganancia",{ payload: nuevaGanancia.toString()}, function (err, resp, body) {
        if(!err){
            console.log(`Se registra la nueva ganancia:[${nuevaGanancia}]`);
        }
    });
};