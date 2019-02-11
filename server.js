'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const restService = express();
var https = require('https');
var fs = require('fs'),
    path = require('path');
restService.use(bodyParser.urlencoded({
    extended: true
}));
restService.use(bodyParser.json());

var Input, Output, Webservice;
var Invoke = require("./invoker");

var intentName = "";

var qString = "";
var speech = "";

restService.post('/inputmsg', function(req, res) {

    var anaConfig = {};
    var listConfig = fs.readFileSync("./anaconfig.json", 'utf8');
    //console.log("COntent : " + listConfig)
    listConfig = JSON.parse(listConfig);

    intentName = req.body.result.metadata.intentName
    for (var i = 0; i < listConfig.length; i++) {
        if (listConfig[i].intent.includes(intentName)) {
            anaConfig = listConfig[i];
            break;
        }
    }
    if(anaConfig.folder != null || anaConfig.folder != "" ){
        Invoke(0, 1, anaConfig, req, res, function() {
            console.log("Done");
        });
    }else{
        speech = "Unable to process your request at the moment. Please try again later. Is there any thing else I can help you with?";
        res.json({
            speech : speech,
            displayText : speech
        });
    }
});

restService.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

var uiDB = require("./jdeuidb");

var qString = "";
restService.get('/getCust', function(req, res) {
    req.body.headers = req.headers;
    qString = "Select * from jde ORDER BY CustName;";
    try {
        //sadasda
        uiDB(qString, req, res, function(result) {
            res.json(result.recordsets);
        });
    } catch (e) {
        console.log("Error : " + e);
    }

});

restService.get('/edit/:custNum', function(req, res) {
    var custNum = req.params.custNum;
    console.log("Num : " + custNum);
    qString = "Select * from jde WHERE CustNum = " + custNum;
    try {
        //sadasda
        uiDB(qString, req, res, function(result) {
            res.json(result.recordsets[0]);
        });
    } catch (e) {
        console.log("Error : " + e);
    }

});

restService.post('/save', function(req, res) {
    var cust = req.body;
    console.log("Num : " + cust.CustNum);
    console.log("Name : " + cust.CustName + ", " + cust.credit + ", " + cust.exposure);
    qString = "Update jde SET credit = " + cust.credit + ", exposure = " + cust.exposure + " WHERE CustName = '" + cust.CustName + "'";
    console.log("Qs = " + qString);
    try {
        //sadasda
        uiDB(qString, req, res, function(result) {
            res.json(result.rowsAffected);
        });
    } catch (e) {
        console.log("Error : " + e);
    }
});

restService.get('/home', onRequest);
restService.use(express.static(path.join(__dirname, '/public')));


function onRequest(request, response) {
    response.sendFile(path.join(__dirname, '/public/index.html'));
}

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});