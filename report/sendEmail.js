module.exports = function(response, anaConfig, req, res, level, callback) {

    var express = require('express');
    var bunyan = require('bunyan');
    var nodemailer = require('nodemailer');
    var restService = express();
    var bodyParser = require('body-parser');
    var fs = require('fs');

    var intentName = req.body.result.metadata.intentName;
    console.log("intentName : " + intentName);

    var SendResponse = require("../sendResponse");
    var speech = "";
    var speechText = "";
    var suggests = [];
    var contextOut = [];

    try {
        console.log("Inside");
        // Create a SMTP transporter object
//        var transporter = nodemailer.createTransport({
//            service: 'Gmail', // no need to set host or port etc.
//            auth: {
//                user: req.body.headers.emailuser,
//                pass: req.body.headers.emailpw
//            }
//        });
        var to_email = "";
        var reportName = "";
        var yearName = "";
        var speech = "";
        var body = "";
        var file = "";
        var subject = "";


        if (intentName == 'ADS_HyperionReport') {
            to_email = req.body.result.parameters.emailaddress;
            reportName = req.body.result.parameters.reportName;
            yearName = req.body.result.parameters.reportYear;

            var chartfield = req.body.result.parameters.chartfield;
            var scenario = req.body.result.parameters.reportScenario;
            var sourceApp = req.body.result.parameters.sourceApp;
            var version = req.body.result.parameters.version;
            var currency = req.body.result.parameters["currency-name"];
            var projects = req.body.result.parameters["projects"];

            speech = 'Report : ' + reportName + ' for ' + projects + ' - ' + chartfield + ' (' + yearName + ') has been emailed to ' + to_email + '. Please give a few minutes for the email to arrive in your inbox. Is there anything else I can help you with?';
            file = "DepartmentalExpenses_Corporate_Report.txt";
            body = '<p><b>Hello,</b></p>' +
                '<p>Attached is the Departmental Expenses Corporate Report as Requested.</p>' +
                '<p>Thanks,<br><b>Viki</b></p>';
            subject = 'Departmental Expenses Corporate Report';
        } else {
            if (intentName == 'reporting') {
                to_email = "gokulgnair94@gmail.com",//"Kaaman.agarwal@oracle.com"; //req.body.result.parameters.email;
                reportName = req.body.result.parameters.reportName;
                yearName = req.body.result.parameters.year;

                var scenario = req.body.result.parameters.reportScenario;
                var sourceApp = req.body.result.parameters.applicationsforReport;

                speech = "Reconcilition report " + scenario + " - PTVPLAN and PPCMRC ( " + yearName + " ) has been emailed to you. Please give a few minutes for the email to arrive in your inbox. Is there anything else I can help you with?";
                file = "PTVPLAN_PPCMRC_ReconReport.txt";
                body = '<p><b>Hello,</b></p>' +
                    '<p>Attached is the PTVPLAN and PPCMRC Reconcilition report as Requested.</p>' +
                    '<p>Thanks,<br><b>Viki</b></p>';
                subject = "Reconcilition report: " + scenario + " - PTVPLAN and PPCMRC";
            }
        }

        console.log(speech);
        console.log('SMTP Configured');
        fs.readFile("./attachment.txt", function (err, data) {

            nodemailer.SMTP = {
            host: 'gmail.com', 
            use_authentication: true, 
                user: req.body.headers.emailuser,
                pass: req.body.headers.emailpw
        };
        nodemailer.send_mail({       
                sender: 'VIKI <' + req.body.headers.emailuser + '>',
                to: 'gokulgnair94@gmail.com',
                subject: 'Attachment!',
                body: 'mail content...',
                attachments: [{'filename': 'PTVPLAN_PPCMRC_ReconReport.pdf', 'content': data}]
            }), function(err, success) {
                if (err) {
                    // Handle error
                    speech = "Error";
                }else{
                    speech = "Done";
                }
            return res.json({
                        speech: speech,
                        displayText: speech,
                        source: 'webhook-OSC-oppty'
                    });
            

            }
        });
        

    } catch (e) {
        console.log("Error : " + e);
        speechText = "Unable to process your request at the moment. Please try again later.";
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}