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

var Index = require("./index");

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

restService.get('/getCust', function(req, res) {
    req.body.headers = req.headers;
    var qString ="Select * from jde";
    try {
        var sql = require("mssql");
        var sqlConfig = {
            user: 'viki',
            password: 'Oracle123',
            server: 'vikisql.c1abev5luwmn.us-west-1.rds.amazonaws.com',
            database: 'viki'
        }
        var qString = "Select * from jde";
        console.log("Qstring : " + qString);
        sql.connect(sqlConfig, function(err) {
            var request = new sql.Request();
            request.query( qString, function(err, output) {
                if (err){ 
                    console.log(err);
                    sql.close();
                }
                else{
                    console.log(JSON.stringify(output)); // Result in JSON format
                    sql.close();
                    //var responseObject = JSON.parse(output);
                    res.json(output.recordsets);
                } 
            });
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