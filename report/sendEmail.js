module.exports = function(response, anaConfig, req, res, level, callback) {
    
    try{

    
    
    const express = require('express');
    const bunyan = require('bunyan');
    const nodemailer = require('nodemailer');
    const restService = express();
    const bodyParser = require('body-parser');
    var fs = require('fs');
    var intentName = req.body.result.metadata.intentName;
    console.log( "Intent : " + intentName );
    console.log("Inside");
    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // no need to set host or port etc.
        auth: {
            user: req.body.headers.emailuser,
            pass: req.body.headers.emailpw
        }
    });
    var to_email = "";       
    var reportName =  "";      
    var yearName =  "";
    var speech = "";
    var body = "";
    var file = "";
    var subject = "";


    if( intentName == 'ADS_HyperionReport' ){
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
        file = "DepartmentalExpenses_Corporate_Report.pdf";
        body = '<p><b>Hello,</b></p>' +
                    '<p>Attached is the Departmental Expenses Corporate Report as Requested.</p>' +
                    '<p>Thanks,<br><b>Viki</b></p>';
        subject = 'Departmental Expenses Corporate Report';
    }else{
        if( intentName == 'reporting' ){
            to_email = "kaaman.agarwal@lntinfotech.com";//req.body.result.parameters.email;
            reportName = req.body.result.parameters.reportName;
            yearName = req.body.result.parameters.year;
            
            var scenario = req.body.result.parameters.reportScenario;
            var sourceApp = req.body.result.parameters.applicationsforReport;
            
            speech = "Reconcilition report " + scenario +" - PTVPLAN and PPCMRC ( " + yearName + " ) has been emailed to you. Please give a few minutes for the email to arrive in your inbox. Is there anything else I can help you with?";
            file = "PTVPLAN_PPCMRC_ReconReport.pdf";
            body = '<p><b>Hello,</b></p>' +
                        '<p>Attached is the PTVPLAN and PPCMRC Reconcilition report as Requested.</p>' +
                        '<p>Thanks,<br><b>Viki</b></p>';
            subject = 'Reconcilition report: Budget - PTVPLAN and PPCMRC';
        }
    }
    
    
    

    console.log(speech);
    console.log('SMTP Configured');
    fs.readFile("./" + file, function(err, data) {
        if(err){
            console.log("Error : " + err);
        }
        // Message object
        let message = {
            from: 'VIKI <' + req.body.headers.emailuser+ '>',
            // Comma separated list of recipients
            to: to_email,
            
            bcc: 'gokul.nair@lntinfotech.com',

            // Subject of the message
            subject: subject, //

            // HTML body
            html: body,

            // Apple Watch specific HTML body
            watchHtml: '<b>Hello</b> to myself',

            //An array of attachments
            attachments: [{
                'filename': file,
                'content': data
            }]

        };

        transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take our messages');
            }
        });

        console.log('Sending Mail');
        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');
            console.log('Server responded with "%s"', info.response);
            transporter.close();
        })
    });
    return res.json({
        speech: speech,
        displayText: speech,
        source: 'webhook-OSC-oppty'
    });

    } catch (e) {
        console.log("Error : " + e);
        speechText = "Unable to process your request at the moment. Please try again later.";
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}