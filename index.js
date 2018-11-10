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

    var actSales = {
        "12067" : {
            "Subject" : "Meeting with James Lee of American Bank",
            "Date" : "12/11/2018",
            "Time" : "11:00 am IST",
            "Account" : "American Bank",
            "SR" : {
                "id" : "INC0003535",
                "Subject" : "Unable to run smart view",
                "Severity" : "High"
            }
        },
        "11245" :  {
            "Subject" : "Call with Phill Rogers of Tata Motors about Oracle Open World",
            "Date" : "12/11/2018",
            "Time" : "04:00 pm IST",
            "Account" : "Tata Motors",
            "SR" : {
                "id" : "INC0002432",
                "Subject" : "Unable to run smart view",
                "Severity" : "High"
            }
        }
    };
    
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
                    speechText = "You have the following pending activities: \n3 Leave requests. \n2 Timesheet requests.\nWhat requests would you like to see?";
                    speech = speechText;
                    suggests = [{"title": "Leaves"},{"title": "Timesheet"}];
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
                    break;
                }
                
            case (intentName == "Activities - Sales"):
                {
                    
                    speechText = "You have the following pending activities: \n";
                    for( var actNum in actSales ){
                        speechText = speechText + "Activity " + actNum + " - " + actSales[actNum].Subject + ".\n";
                        suggests.push({"title": actNum})
                    }
                    speech = speechText;
                    
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
                    break;
                }
                
            case (intentName == "Activities - Sales - custom"):
                {
                    var activityNumber = req.body.result.parameters.activityNumber;
                    
                    speechText = "Activity - " + activityNumber + ",\n" + "Subject - " + actSales[activityNumber].Subject + ",\n" + "Date - " + actSales[activityNumber].Date + ",\n" + "Time - " + actSales[activityNumber].Time + ",\n" + "Account - " + actSales[activityNumber].Account + ".\n";
                    speechText += "\nWould you like to know the churn index or news about " + actSales[activityNumber].Account + ", get the service requests from this user or should I close this activity?";
                    speech = speechText;
                    suggests = [
                        {
                            "title" : "The churn index"
                        },
                        {
                            "title" : "What's in the news"
                        },
                        {
                            "title" : "Service requests"
                        }
                    ];
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
                    break;
                }
                
            case (intentName == "Activities - Sales - custom - custom-SR"):
                {
                    var activityNumber = req.body.result.parameters.activityNumber;
                    speechText = "Account - " + actSales[activityNumber].Account + ",\n" + "Ticket - " + actSales[activityNumber].SR.id + ",\n" + "Subject - " + actSales[activityNumber].SR.Subject + ",\n" + "Severity - " + actSales[activityNumber].SR.Severity + ".\n";
                    speech = speechText;
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
                    break;
                }
            
            case (intentName == "Activities - Sales - custom - news"):
                {
                    var GetNews = require("./getnews");
                    var activityNumber = req.body.result.parameters.activityNumber;
                    GetNews( actSales[activityNumber].Account, req, res, function(result) {
                            console.log("Get News Called");
                        });
                    break;
                }
                


                case (intentName == "Activities - Service"):
                {
                    speechText = "You have the following open service requests: \n1. INC0003535 - Kathy Watkins of American Bank - Unable to run smart view.";
                    speech = "You have the following open service requests: \n. Ticket INC0003535 Kathy Watkins of American Bank - Unable to run smart view.";
                    suggests = [{"title": "INC0003535"}];
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
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