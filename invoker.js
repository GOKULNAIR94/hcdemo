module.exports = function( index, inputInvoke, anaConfig, req, res) {
    if( index < anaConfig.invoke.length){
        var outputInvoke;
        var Invoke = require("./invoker");
        var Invoker = require("./" + anaConfig.folder + "/" + anaConfig.invoke[index] );
        Invoker( inputInvoke, anaConfig, req, res, function(resultInvoke){
            console.log("Result In: " + resultInvoke );
            Invoke( index+1, outputInvoke, anaConfig, req, res, function(){
                console.log("Done");
            });
        });
        

//        switch(anaConfig.invoke[index]){
//                case("input"):{
//                    Input = require("./" + anaConfig.folder + "/input");
//                    Input( inputInvoke, anaConfig, req, res, function(resultIn){
//                        console.log("Result In: " + resultIn );
//                        outputInvoke = resultIn;
//                        Invoke( index+1, outputInvoke, anaConfig, req, res, function(){
//                            console.log("Done");
//                        });
//                    });
//                    break;
//                }
//                case("webservice"):{
//                    Webservice = require("./" + anaConfig.folder + "/webservice");
//                    var qString = inputInvoke;
//                    Webservice( qString, anaConfig, req, res, function(resultWeb){
//                        console.log("Result Web : " + JSON.stringify(resultWeb) );
//                        outputInvoke = resultWeb;
//                        Invoke( index+1, outputInvoke, anaConfig, req, res, function(){
//                            console.log("Done");
//                        });
//                    });
//                    break;
//                }
//                case("output"):{
//                    Output = require("./" + anaConfig.folder + "/output")
//                    var response = inputInvoke;
//                    Output( response, anaConfig, req, res, 1, function(resultOut){
//                        console.log("Result Out : + " + resultOut);
//                        outputInvoke = resultWeb;
//                        Invoke( index+1, outputInvoke, anaConfig, req, res, function(){
//                            console.log("Done");
//                        });
//                    });
//                    break;
//                }
//                default:{
//                    console.log("Feature coming soon.");
//                    speech = "Feature coming soon."
//                    res.json({
//                        speech : speech,
//                        displayText : speech
//                    });
//                    break;
//                }
//        }
    }
}