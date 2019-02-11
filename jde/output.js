module.exports = function(response, anaConfig, req, res, callback) {
    try {

        var level = 0;
        level = anaConfig.output.variable.level;

        var CustNum = req.body.result.parameters.CustNum;
        var CustName = req.body.result.parameters.CustName;
        CustName = CustName.replace(/[^\w\s]/gi, '');
        var jde_attrib = req.body.result.parameters.jde_attrib;
        console.log(" Output js: \nCust Num = " + CustNum + "\nCust Name =" + CustName + "\njde_attrib =" + jde_attrib);

        var SendResponse = require("../sendResponse");

        var Webservice = require("./webservice");
        var Output = require("./output")

        var qString = "";
        var speech = "";
        var speechText = "";
        var suggests = [];
        var contextOut = [];

        var shortName = "";

        if (response.rowsAffected == 0) {
            if (CustName != "" && CustName != null) {
                shortName = CustName.substr(0, (CustName.length) / level);
                console.log("Short : " + shortName + "\nLength : " + shortName.length + "\nLevel : " + level);
                if (shortName.length >= 3 && level <= 3) {
                    qString = "Select * from jde WHERE CustName  LIKE '" + shortName + "%' OR REPLACE(REPLACE(REPLACE(CustName, '.',''), ',', ''), '/', '') LIKE '" + shortName + "%'";

                    Webservice(qString, anaConfig, req, res, function(resultWeb1) {
                        anaConfig.output.variable.level = level + 1;
                        Output(resultWeb1, anaConfig, req, res, function(resultOut) {
                            console.log("Result Out : + " + resultOut);
                        });
                    });
                } else {
                    speechText = "No record found.";
                    speech = speechText;
                    SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                        console.log("Finished!");
                    });
                }
            } else {
                speechText = "No record found.";
                speech = speechText;
                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                    console.log("Finished!");
                });
            }
        } else {
            if (response.rowsAffected == 1) {
                if (jde_attrib == "credit"){
                    speechText = "Credit limit for " + response.recordset[0].CustName + "(" + response.recordset[0].CustNum + ") is " + response.recordset[0].credit;
                    speech = "Credit limit for " + response.recordset[0].CustName + " is " + response.recordset[0].credit;
                }
                else {
                    if (jde_attrib == "exposure") {
                        speechText = "Total exposure for " + response.recordset[0].CustName + "(" + response.recordset[0].CustNum + ") is " + response.recordset[0].exposure;
                        speech = "Total exposure for " + response.recordset[0].CustName + " is " + response.recordset[0].exposure;
                    } else {
                        speechText = "Unable to process your request please try again later."
                    }
                }
            } else {
                speechText = "Please select one of the following:\n";
                speech = speechText;
                speechText += "Customer ";
                suggests = [];
                for (var i = 0; i < response.recordset.length; i++) {
                    speechText += response.recordset[i].CustNum + " : " + response.recordset[i].CustName + ",\n";
                    suggests.push({
                        "title": "" + response.recordset[i].CustNum
                    });
                }
            }
            console.log("Speech : " + speech);
            SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                console.log("Finished!");
            });
        }
    } catch (e) {
        console.log("Error : " + e);
        speechText = "No record found.";
        speech = speechText;
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });

    }
}