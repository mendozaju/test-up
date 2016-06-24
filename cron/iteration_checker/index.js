'use strict';


exports.haveToSale = function(iterationCount, saldo){
    var result = false;
    if(iterationCount <= 0 && saldo){
        result = true;
    }    
    return result;
};

exports.haveToBuild = function(iterationCount, saldo){
    var result = false;
    if(iterationCount <= 0 && !saldo){
        result = true;
    }    
    return result;
};




