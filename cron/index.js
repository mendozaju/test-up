'use strict';

var CronJob = require('cron').CronJob;
var Wreck = require('wreck');
var iterationCheck = require('./iteration_checker');
var serverClient = require('./server_client');

const execServer = require('child_process').exec;
const startServerCommand = 'node server/index.js';


console.log('Arrancando server server ..');
execServer(startServerCommand, function (error, stdout, stderr) {
    console.log(stdout);
});

var VALOR_GANADO = 0;
var VALOR_COMPRA = 647;
var VALOR_VENTA = 0;
var SALDO = true;
var ITERACIONES_MAXIMAS = 120;
var ITERACIONES_ACTUALES = ITERACIONES_MAXIMAS;
var TRANSACCION_REALIZADA = false;

new CronJob('*/15 * * * * *', function () {
        
        //https://test-money.herokuapp.com
        //http://localhost:3000/api
        Wreck.get("https://test-money.herokuapp.com/api", function (err, resp, body) {

            if (err) {
                console.log('ERROR!!!...' + err);
            }
            
            var valorString = JSON.stringify(JSON.parse(body).ask).replace(/"|'/g, '');
            var valorActual = parseFloat(valorString);
        
            
            if(SALDO){
                console.log(`Valor de compra:[${VALOR_COMPRA}]`);
            }else{
              console.log(`Valor de venta:[${VALOR_VENTA}]`);  
            }
            console.log(`Valor actual:[${valorActual}]`);
            
            if ( VALOR_COMPRA + 1 <  valorActual && SALDO || iterationCheck.haveToSale(ITERACIONES_ACTUALES, SALDO)){
                console.log('vendo...');
                if( iterationCheck.haveToSale(ITERACIONES_ACTUALES, SALDO)){
                    ITERACIONES_ACTUALES = ITERACIONES_MAXIMAS;
                    console.log(`Forzado por numero de interaccion... se resetea a:[${ITERACIONES_ACTUALES}]`);
                }
                
                console.log(`Valor de compra:[${VALOR_COMPRA}] - Valor actual:[${valorActual}]`);
                VALOR_GANADO = VALOR_GANADO + (valorActual - VALOR_COMPRA);
                serverClient.setNuevaGanancia(VALOR_GANADO);      
                console.log(`-> Ganancia:[${VALOR_GANADO}]`);
                VALOR_VENTA = valorActual;
                
                console.log(`* Nuevo valor de venta:[${VALOR_VENTA}]`); 
                SALDO = false;  
                TRANSACCION_REALIZADA = true;
                     
            }else{
                TRANSACCION_REALIZADA= false;
            }
            
            if( VALOR_VENTA - 1 > valorActual && !SALDO || iterationCheck.haveToBuild(ITERACIONES_ACTUALES, SALDO)){
                console.log('compro...');
                if( iterationCheck.haveToBuild(ITERACIONES_ACTUALES, SALDO)){
                    ITERACIONES_ACTUALES = ITERACIONES_MAXIMAS;
                    console.log(`Forzado por numero de interaccion... se resetea a:[${ITERACIONES_ACTUALES}]`);
                }
                
                
                console.log(`Vendi a:[${VALOR_VENTA}] - Compro ahora a:[${valorActual}]`);
                
                VALOR_COMPRA = valorActual;
                console.log(`Nuevo valor de compra:[${valorActual}]`); 
                SALDO = true;    
                        
            } else{
                TRANSACCION_REALIZADA= false;
            }          
                
            //Decremento el numero de transacciones
            if(!TRANSACCION_REALIZADA){
                ITERACIONES_ACTUALES = ITERACIONES_ACTUALES -1;
            }
            
        })





}, null, true, 'America/Los_Angeles');