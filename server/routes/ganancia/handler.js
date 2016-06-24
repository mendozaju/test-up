/**
 * API impl
 */
exports.getGanancia = function (request, reply) {

    request.server.methods['getGanancia'](function (err, result) {
        reply('La ganancia es de -> ' + result );
    });
};


exports.setGanancia = function (request, reply){
    var nuevaGanancia = parseFloat(request.payload);
    console.log(`Se recibe la nueva ganancia[${nuevaGanancia}]`);
    
    request.server.methods['setGanancia']( nuevaGanancia, function (err, result) {
       reply('OK');
    });    
}
