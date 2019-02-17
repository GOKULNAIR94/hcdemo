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
        
        

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail', // no need to set host or port etc.
            auth: {
                user: req.body.headers.emailuser,
                pass: req.body.headers.emailpw
            }
    });

    // setup e-mail data with unicode symbols
    

    // send mail with defined transport object
        fs.readFile("./PTVPLAN_PPCMRC_ReconReport.pdf", function(err, data) {
            var mailOptions = {
                from:'VIKI <' + req.body.headers.emailuser + '>',
                to: 'gokulgnair94@gmail.com', // list of receivers
                subject: 'Hello ✔', // Subject line
                text: 'Hello world ?', // plaintext body
                html: '<b>Hello world ?</b>', // html body
                attachments: [{
                            'filename': "./PTVPLAN_PPCMRC_ReconReport.pdf",
                            'content': data
                        }]
            };
            
             transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            
            
        });
   
    
    } catch (e) {
        console.log("Error : " + e);
        speechText = "Unable to process your request at the moment. Please try again later.";
        SendResponse(speech, speechText, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    }
}