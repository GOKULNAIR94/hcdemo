module.exports = function( req, res) {
	
	var SendResponse = require("./sendResponse");
    var AwsDB = require("./awsdb");
	
    var intentName = req.body.result.metadata.intentName;
	
	var speech = "";
    var speechText = "";
    var suggests = [];
    var contextOut = [];
    
    var qString= "";
	
    try {
		switch(true){
			case (intentName == "JDE_creditlimit" || intentName == "JDE_creditlimit_name" || intentName == "JDE_exposure_followcredit"):
                {
					
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
                        if(qString != ""){
                            AwsDB( qString, req, res, function(result) {
                                if( result.rowsAffected == 0){
                                    speechText = "No records found.";
									if (CustName != "" && CustName != null) {
										console.log("CustName : " + CustName.length);
										qString = "Select * from jde WHERE CustName  LIKE '" + CustName.substr(0, (CustName.length)/2) + "%'";
										AwsDB( qString, req, res, function(result1) {
											if( result1.rowsAffected == 0){
												qString = "Select * from jde WHERE CustName  LIKE '" + CustName.substr(0, (CustName.length)/4) + "%'";
													AwsDB( qString, req, res, function(result1) {
														if( result1.rowsAffected == 0){
															speechText = "No records found.";
														}
														else{
															speechText = "Please select one of the following:\n";
															speechText += "Customer ";
															suggests = [];
															for( var i = 0; i < result1.recordset.length; i++){
																speechText += result1.recordset[i].CustNum + " : " + result1.recordset[i].CustName + ",\n";
																suggests.push({ "title": result1.recordset[i].CustNum });
															}
														}
														speech = speechText;
														SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
															console.log("Finished!");
														});
													});
											}
											else{
												speechText = "Please select one of the following:\n";
												speechText += "Customer ";
												suggests = [];
												for( var i = 0; i < result1.recordset.length; i++){
													speechText += result1.recordset[i].CustNum + " : " + result1.recordset[i].CustName + ",\n";
													suggests.push({ "title": result1.recordset[i].CustNum });
												}
											}
											speech = speechText;
											SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
												console.log("Finished!");
											});
										});
									}else{
										speechText = "Error";
										speech = speechText;
										SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
											console.log("Finished!");
										});
									}
									
									
                                }
                                else{
                                    speechText = "Credit limit for " + result.recordset[0].CustName + "(" + result.recordset[0].CustNum  + ") is " + result.recordset[0].credit;
									speech = speechText;
									SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
										console.log("Finished!");
									});
                                }
                                
                            });
                        }
                        else{
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
                    break
                }
                
                
                case (intentName == "JDE_exposure" || intentName == "JDE_exposure_name" || intentName == "JDE_creditlimit_followexposure"):
                {
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
                        if(qString != ""){
                            AwsDB( qString, req, res, function(result) {
                                if( result.rowsAffected == 0){
                                    speechText = "No records found.";
									if (CustName != "" && CustName != null) {
										console.log("CustName : " + CustName.length);
										qString = "Select * from jde WHERE CustName  LIKE '" + CustName.substr(0, (CustName.length)/2) + "%'";
										AwsDB( qString, req, res, function(result1) {
											if( result1.rowsAffected == 0){
												qString = "Select * from jde WHERE CustName  LIKE '" + CustName.substr(0, (CustName.length)/4) + "%'";
													AwsDB( qString, req, res, function(result1) {
														if( result1.rowsAffected == 0){
															speechText = "No records found.";
														}
														else{
															speechText = "Please select one of the following:\n";
															speechText += "Customer ";
															suggests = [];
															for( var i = 0; i < result1.recordset.length; i++){
																speechText += result1.recordset[i].CustNum + " : " + result1.recordset[i].CustName + ",\n";
																suggests.push({ "title": result1.recordset[i].CustNum });
															}
														}
														speech = speechText;
														SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
															console.log("Finished!");
														});
													});
											}
											else{
												speechText = "Please select one of the following:\n";
												speechText += "Customer ";
												suggests = [];
												for( var i = 0; i < result1.recordset.length; i++){
													speechText += result1.recordset[i].CustNum + " : " + result1.recordset[i].CustName + ",\n";
													suggests.push({ "title": result1.recordset[i].CustNum });
												}
											}
											speech = speechText;
											SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
												console.log("Finished!");
											});
										});
									}else{
										speechText = "Error";
										speech = speechText;
										SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
											console.log("Finished!");
										});
									}
									
									
                                
                                }
                                else{
                                    speechText = "Total Exposure for " + result.recordset[0].CustName + "(" + result.recordset[0].CustNum  + ") is " + result.recordset[0].exposure;
                                }
                                speech = speechText;
                                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                                    console.log("Finished!");
                                });
                            });
                        }
                        else{
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
                    break;
                }
                case (intentName == "JDE_creditlimit_update" || intentName == "JDE_creditlimit_name_update" || intentName == "JDE_exposure_followcredit_update" ):{
                    var CustNum = req.body.result.parameters.CustNum;
                    var CustName = req.body.result.parameters.CustName;
                    var credit = req.body.result.parameters.credit;
                    console.log("Credit = " + CustName +", " + CustNum + ", " + credit);
                    if ((CustNum == "" || CustNum == null) && (CustName == "" || CustName == null)) {
                            speechText = "Please provide the Customer name or number."
                        } else {
                            if (CustNum == "" || CustNum == null) {

                                qString = "Update jde SET credit = " + credit + " WHERE CustName = '" + CustName + "'";
                            } else if (CustName == "" || CustName == null) {

                                qString = "Update jde SET credit = " + credit + " WHERE CustNum = '" + CustNum + "'";
                            } else {
                                speechText = "Error";
                            }
                        }
                    if(qString != ""){
                            AwsDB( qString, req, res, function(result) {
                                if( result.rowsAffected == 0){
                                    speechText = "No records found.";
                                }
                                else{
                                    speechText = "Record successfully updated.";
                                }
                                speech = speechText;
                                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                                    console.log("Finished!");
                                });
                            });
                        }
                        else{
                            speech = speechText;
                            SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                                console.log("Finished!");
                            });
                        }
                    break;
                }
                case (intentName == "JDE_exposure_update" || intentName == "JDE_exposure_name_update" || intentName == "JDE_creditlimit_followexposure_update" ):{
                    var CustNum = req.body.result.parameters.CustNum;
                    var CustName = req.body.result.parameters.CustName;
                    var exposure = req.body.result.parameters.exposure;
                    console.log("Exposure = " + CustName +", " + CustNum + ", " + exposure);
                    if ((CustNum == "" || CustNum == null) && (CustName == "" || CustName == null)) {
                            speechText = "Please provide the Customer name or number."
                        } else {
                            if (CustNum == "" || CustNum == null) {

                                qString = "Update jde SET exposure = " + exposure + " WHERE CustName = '" + CustName + "'";
                            } else if (CustName == "" || CustName == null) {

                                qString = "Update jde SET exposure = " + exposure + " WHERE CustNum = '" + CustNum + "'";
                            } else {
                                speechText = "Error";
                            }
                        }
                    if(qString != ""){
                            AwsDB( qString, req, res, function(result) {
                                if( result.rowsAffected == 0){
                                    speechText = "No records found.";
                                }
                                else{
                                    speechText = "Record successfully updated."
                                }
                                speech = speechText;
                                SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                                    console.log("Finished!");
                                });
                            });
                        }
                        else{
                            speech = speechText;
                            SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
                                console.log("Finished!");
                            });
                        }
                    break;
                }
			
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