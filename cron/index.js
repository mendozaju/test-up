'use strict';

var CronJob = require('cron').CronJob;
var Wreck = require('wreck');

const execServer = require('child_process').exec;
const startServerCommand = 'node server/index.js';


console.log('Arrancando server server ..');
execServer(startServerCommand, function (error, stdout, stderr) {
    console.log(stdout);
});

var VALOR_GANADO = 0;
var VALOR_COMPRA = 638;
var VALOR_VENTA = 0;
var SALDO = true;

new CronJob('*/15 * * * * *', function () {
 
        Wreck.get("http://localhost:3000/api", function (err, resp, body) {

            if (err) {
                console.log('ERROR!!!...' + err);
            }
            
            var valorString = JSON.stringify(JSON.parse(body).ask).replace(/"|'/g, '');
            var valorActual = parseFloat(valorString);
            //console.log('Valor string: ' + valorString);
            //console.log('Valor Actual:' + valorActual);
            
            
            if(SALDO){
                console.log(`Valor de compra:[${VALOR_COMPRA}]`);
            }else{
              console.log(`Valor de venta:[${VALOR_VENTA}]`);  
            }
            console.log(`Valor actual:[${valorActual}]`);
            
            
            //Si tengo que vender
            //console.log(`Valor de compra:[${VALOR_COMPRA}]`);
            if ( VALOR_COMPRA + 1 <  valorActual && SALDO){
                console.log('vendo...');
                
                console.log(`Valor de compra:[${VALOR_COMPRA}] - Valor actual:[${valorActual}]`);
                VALOR_GANADO = VALOR_GANADO + (valorActual - VALOR_COMPRA);                
                console.log(`-> Ganancia:[${VALOR_GANADO}]`);
                VALOR_VENTA = valorActual;
                
                console.log(`* Nuevo valor de venta:[${VALOR_VENTA}]`); 
                SALDO = false;               
            }
            
            //Si tengo que comprar
            //console.log(`Valor de venta:[${VALOR_VENTA}]`);
            if( VALOR_VENTA - 1 > valorActual && !SALDO){
                console.log('compro...');
                console.log(`Vendi a:[${VALOR_VENTA}] - Compro ahora a:[${valorActual}]`);
                
                VALOR_COMPRA = valorActual;
                console.log(`Nuevo valor de compra:[${valorActual}]`); 
                SALDO = true;              
            }            
            
        })





}, null, true, 'America/Los_Angeles');