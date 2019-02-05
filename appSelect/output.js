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
            case (intentName == "Default Welcome Intent"):
                {
                    speechText = "Hi! I am Aura, I am here to assist you in working with your Oracle Applications. Which application would you like to access?";
                    speech = speechText;
                    suggests = [{
                            "title": "JD Edwards"
                        }, {
                            "title": "EBS"
                        }, {
                            "title": "Engagment Cloud"
                        }];
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                        console.log("Finished!");
                    });
                    break;
                }
            case (intentName == "Default Welcome Intent_application"):
                {
                    var appName = req.body.result.parameters.application;
                    switch(appName){
                            case("jde"):{
                                speechText = "Cool. For JD Edwards, I can help you with the following services, \nCredit Limit, \nTotal Exposure. \nHow can I help you?";
                                speech = speechText;
                                suggests = [{
                                    "title": "Credit Limit"
                                }, {
                                    "title": "Total Exposure"
                                }];
                                break;
                            }
                        default:{
                            speechText = "I don't have access to " + appName + " yet.";
                            speech = speechText;
                        }
                    }
                    
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