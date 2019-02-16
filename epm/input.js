module.exports = function(dummy, anaConfig, req, res, callback) {
    try {

        var input = {};
        var intentName = req.body.result.metadata.intentName;
        var appName = req.body.result.parameters.epm_application;
        if (appName == "" || appName == null)
            appName = "vision";
        
        var epm_product = "", Period = "";
        if (req.body.result.parameters.epm_product == "" || req.body.result.parameters.epm_product == null)
            epm_product = "No Product"
        else
            epm_product = req.body.result.parameters.epm_product;
        
        if (req.body.result.parameters.Period == "" || req.body.result.parameters.Period == null)
            Period = "YearTotal"
        else
            Period = req.body.result.parameters.Period;
        

        switch (true) {
            case (intentName == "EPM_MDXQuery"):
                {
                    input.qString = "/HyperionPlanning/rest/11.1.2.4/applications/" + appName + "/plantypes/plan1/exportdataslice";

                    //input.body = "mdxQuery=SELECT {[Period].[" + req.body.result.parameters.Period + "]} ON COLUMNS, {[Account].[" + req.body.result.parameters.epm_account + "]} ON ROWS FROM Vision.Plan1 WHERE ([Year].[" + req.body.result.parameters.epm_year + "],[Scenario].[" + req.body.result.parameters.epm_scenario + "],[Version].[" + req.body.result.parameters.epm_version + "],[Entity].[" + "403" + "],[Product].[" + "No Product" + "])";

                    input.body = {
                        "exportPlanningData": false,
                        "gridDefinition": {
                            "suppressMissingBlocks": true,
                            "pov": {
                                "dimensions": ["HSP_View", "Year", "Scenario", "Version", "Entity", "Product"],
                                "members": [
                                    ["BaseData"],
                                    [req.body.result.parameters.epm_year],
                                    [req.body.result.parameters.epm_scenario],
                                    [req.body.result.parameters.epm_version],
                                    ["Total Entity"],
                                    [epm_product]
                                ]
                            },
                            "columns": [{
                                "dimensions": ["Period"],
                                "members": [
                                    [Period]
                                ]
                            }],
                            "rows": [{
                                "dimensions": ["Account"],
                                "members": [
                                    [req.body.result.parameters.epm_account]
                                ]
                            }]
                        }
                    };

                    callback(input);
                    break;
                }

            case (intentName == "EPM_Jobs"):
                {
                    input.qString = "/HyperionPlanning/rest/11.1.2.4/applications/" + appName + "/jobs";
                    input.body = {
                        "jobType": "CUBE_REFRESH",
                        "jobName": "CubeRefresh"
                    };
                    callback(input);
                    break;
                }

            case (intentName == "EPM_Jobs - custom" || intentName == "EPM_JobStatus"):
                {
                    var jobId = "";
                    if (intentName == "EPM_Jobs - custom") {
                        var array = req.body.result.contexts;

                        for (var key in array) {
                            console.log("**************************\narray " + key + " : " + JSON.stringify(array[key]));
                            if (array[key].name == "jobid") {
                                jobId = array[key].parameters["jobid"];
                                break;
                            }
                        }
                    } else
                    if (intentName == "EPM_JobStatus") {
                        jobId = req.body.result.parameters.jobid;
                    }

                    console.log("jobid : " + jobId);
                    if (jobId != "" && jobId != null) {
                        input.qString = "/HyperionPlanning/rest/11.1.2.4/applications/" + appName + "/jobs/" + jobId;
                        callback(input);
                    } else {
                        speechText = "Unable to process your request at the moment. Please try again later.";
                        speech = speechText;
                        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                            console.log("Finished!");
                        });
                    }
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