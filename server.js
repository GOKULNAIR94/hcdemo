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

restService.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

var Index = require("./index");
var uiDB = require("./jdeuidb");
var speech = "";


restService.post('/inputmsg', function(req, res) {
    req.body.headers = req.headers;

    try {
        Index(req, res, function(result) {
            console.log("Index Called : " + JSON.stringify(result));
        });
    } catch (e) {
        console.log("Error : " + e);
    }

});

var qString = "";
restService.get('/getCust', function(req, res) {
    req.body.headers = req.headers;
    qString ="Select * from jde";
    try {
        //sadasda
        uiDB( qString, req, res, function(result) {
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
            uiDB( qString, req, res, function(result) {
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
            uiDB( qString, req, res, function(result) {
                res.json(result.rowsAffected);
            });
        } catch (e) {
            console.log("Error : " + e);
        }
});

restService.get('/home', onRequest);
restService.use(express.static(path.join(__dirname, '/public')));


function onRequest(request, response){
  response.sendFile(path.join(__dirname, '/public/index.html'));
}

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});