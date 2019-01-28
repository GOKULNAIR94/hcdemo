module.exports = function(qString, req, resp, callback) {
    try {
        var CustNum = req.body.result.parameters.CustNum;
        var CustName = req.body.result.parameters.CustName;
        console.log("Cust Num = " + CustNum + "\nCust Name =" + CustName);
        if ((CustNum == "" || CustNum == null) && (CustName == "" || CustName == null)) {
            speechText = "Please provide the Customer name or number."
        } else {
            if (CustNum == "" || CustNum == null) {
                qString = "Select * from jde WHERE CustName  = '" + CustName + "'";
            } else if (CustName == "" || CustName == null) {
                qString = "Select * from jde WHERE CustNum  = " + CustNum;
            } else {
                speechText = "Error";
            }
        }
        if (qString != "") {
            AwsDB(qString, req, res, function(result) {
                if (result.rowsAffected == 0) {
                    speechText = "No records found.";
                } else {
                    speechText = "Credit limit for " + result.recordset[0].CustName + "(" + result.recordset[0].CustNum + ") is " + result.recordset[0].credit;
                }
                speech = speechText;
                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                    console.log("Finished!");
                });
            });
        } else {
            speech = speechText;
            SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                console.log("Finished!");
            });
        }

    } catch (e) {
        speechText = "Error";
        speech = speechText;
        console.log("Error: " + e);
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}