module.exports = function(req, res) {

    const express = require('express');
    const bodyParser = require('body-parser');
    const restService = express();
    var http = require('https');
    var fs = require('fs');
    var date = require('date-and-time');
    var QueryDB = require("./queryDB");


    var intentName = req.body.result.metadata.intentName;
    console.log("intentName : " + intentName);
    try {
        var speech = "";
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
                    var speechText = "Its " + time + ", " + date + ". \n";
                    speech = speechText;
                    var weather = require('weather-js');

                    weather.find({
                        search: '94568',
                        degreeType: 'C'
                    }, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(JSON.stringify(result, null, 2));
                            speechText = speechText + "Currently in San Jose, it's " + result[0].current.temperature + "°C and sky is " + result[0].forecast[1].skytextday + ". \n";
                        }
                        speechText = speechText + "You have couple of HR and Sales activities for the day. What activities would you like to see. HR or Sales?";
                        speech = speech + "You have couple of HR and Sales activities for the day. What activities would you like to see. HR or Sales?";
                        return res.json({
                            speech: speech,
                            displayText: speechText
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