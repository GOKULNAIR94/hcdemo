module.exports = function(req, res) {

    const express = require('express');
    const bodyParser = require('body-parser');
    const restService = express();
    var http = require('https');
    var fs = require('fs');
    var date = require('date-and-time');
    
    var SendResponse = require("./sendResponse");


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
                    speech = "Hi! How can i help?";
                    return res.json({
                        speech: speech,
                        displayText: speech
                    })
                    break;
                }

            case (intentName == "Activities"):
                {
                    var time = date.format(new Date(), 'hh:mm A');
                    var date = date.format(new Date(), 'dddd MMMM DD YYYY');
                    speechText = "Its " + time + ", " + date + ". \n";
                    speech = speechText;
                    var weather = require('weather-js');

                    weather.find({
                        search: '600119',
                        degreeType: 'C'
                    }, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(JSON.stringify(result, null, 2));
                            speechText = speechText + "Currently in Chennai, it's " + result[0].current.temperature + "°C and sky is " + result[0].forecast[1].skytextday + ". \n";
                        }
                        speechText = speechText + "You have couple of HR, Sales and Service activities for the day. What activities would you like to see. HR, Sales or Service?";
                        speech = speech + "You have couple of HR, Sales and Service activities for the day. What activities would you like to see. HR, Sales or Service?";
                        suggests = [{"title": "HR"},{"title": "Sales"},{"title": "Service"}]
                        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
                    });
                    break;
                }

            case (intentName == "Activities - HR"):
                {
                    break;
                }
        }



    } catch (e) {
        console.log("Error : " + e);
        speech = "Unable to process the request. Please try again later.";
        res.json({
            speech: speech,
            displayText: speech
        })
    }
}