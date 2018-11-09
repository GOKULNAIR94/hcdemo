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
var Google = require("./google");

var speech = "";


restService.post('/inputmsg', function(req, res) {

    try {
        Index(req, res, function(result) {
            console.log("Index Called : " + JSON.stringify(result));
        });
    } catch (e) {
        console.log("Error : " + e);
    }

});


restService.listen((process.env.PORT || 9000), function() {
    console.log("Server up and listening");
});