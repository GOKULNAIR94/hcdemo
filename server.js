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

restService.get('/home', onRequest);
restService.use(express.static(path.join(__dirname, '/public')));


function onRequest(request, response){
  response.sendFile(path.join(__dirname, '/public/index.html'));
}

restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});