module.exports = function(response, anaConfig, req, res, level, callback) {
    var SendResponse = require("../sendResponse");
    var speech = "";
    var speechText = "";
    var suggests = [];
    var contextOut = [];
    
    var intentName = req.body.result.metadata.intentName;
    console.log("intentName : " + intentName);
    
    try {
        switch (true) {
            case (intentName == "smalltalk.confirmation.cancel"):
                {
					console.log("Res :" + req.body.result.contexts);
					contextOut = req.body.result.contexts;
					for(var i=0; i < contextOut.length; i++){
						contextOut[i].lifespan = 0;
					}
                    speechText = "Dismissed! Let me know what I should do next.";
					speech = speechText;
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                        console.log("Finished!");
                    });
                    break;
                }
            default:{
                speechText = "Unable to process your request. Please try again later?"
                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                    console.log("Finished!");
                });
                break;
            }
        }
    }
    catch(e){
        console.log("Error : " + e);
        speechText = "Unable to process your request at the moment. Please try again later.";
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}