module.exports = function( index, inputInvoke, anaConfig, req, res) {
    if( index < anaConfig.invoke.length){
        
        var Invoke = require("./invoker");
        var Invoker = require("./" + anaConfig.folder + "/" + anaConfig.invoke[index] );
        Invoker( inputInvoke, anaConfig, req, res, function(resultInvoke){
            console.log("Result In: " + resultInvoke );
            Invoke( index+1, resultInvoke, anaConfig, req, res, function(){
                console.log("Done");
            });
        });
    }
}