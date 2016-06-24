'use strict';

var Wreck = require('wreck');

var getRate = function (reply) {

    Wreck.get("https://api.uphold.com/v0/ticker/",function (err, resp, body) {
        
        if(err){
            console.log('ERROR!!!');
            return error;
        }  
        
        var repos
        
        console.log('Response:' + JSON.stringify( JSON.parse(body)[0]));
              
        reply(JSON.parse(body)[1]);
    })

}


/**
 * API impl
 */
exports.header = function (request, reply) {
    console.log('Se ejecuta la respuesta...');
    getRate(reply);
    //console.log(rate);
    //reply(rate);
};
