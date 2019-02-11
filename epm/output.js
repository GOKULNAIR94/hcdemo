module.exports = function( response, anaConfig, req, res, callback) {

    var toTitleCase = require("titlecase");
    var SendResponse = require("../sendResponse");
    
    try {
        var speech = "";
        var speechText = "";
        var suggests = [];
        var contextOut = [];

        var intentName = req.body.result.metadata.intentName;

        switch (true) {
            case (intentName == "EPM_MDXQuery"):
                {
                    speechText = "The " + toTitleCase(req.body.result.contexts[0].parameters["epm_account.original"]) + " – " + req.body.result.parameters.epm_account + " (Version: " + req.body.result.parameters.epm_version + ", Scenario: " + req.body.result.parameters.epm_scenario + ") for " + toTitleCase(req.body.result.contexts[0].parameters["Period.original"]) + " " + req.body.result.contexts[0].parameters["epm_year.original"] + " is $" + parseFloat(parseFloat(response.rows[0].data[0]).toFixed(2)).toLocaleString() + ". \nIs there anything else I can help you with?"

                    speech = speechText;
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                        console.log("Finished!");
                    });
                    break;
                }

            case (intentName == "EPM_Jobs"):
                {
                    speechText = "Job (Id: " + response.jobId + ") submitted for Cube Refresh (Application – ITOH) with a current status of " + response.descriptiveStatus + ". \nPlease check in a few minutes for the updated status.";
                    contextOut = [{
                        "name": "jobid",
                        "lifespan": 1,
                        "parameters": {
                            "jobid": response.jobId
                        }
                    }];
                    speech = speechText;
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                        console.log("Finished!");
                    });
                    break;
                }

            case (intentName == "EPM_Jobs - custom" || intentName == "EPM_JobStatus"):
                {
                    speechText = "Status of job (Id: " + response.jobId + ") is " + response.descriptiveStatus + ", \n" + "JobName: " + response.jobName;
                    if (response.descriptiveStatus == "Error") {
                        speechText += ", \nDetails : " + response.details;
                    }
                    speech = speechText;
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                        console.log("Finished!");
                    });
                    break;
                }

        }
    } catch (e) {
        console.log("Error : " + e);
        speechText = "Unable to process your request at the moment. Please try again later.";
        speech = speechText;
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}