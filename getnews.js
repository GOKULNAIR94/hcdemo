module.exports = function( track, req, res, callback) {
    console.log("Activity Reached!");

    var SendResponse = require("./sendResponse");
    var https = require('https');

        var varHost = 'vikinews.herokuapp.com';
        var varPath = '/inputmsg';
        var toSend = {
            "key": "value"
        };
        toSend["track"] = track;
        toSend["intentName"] = req.body.result.metadata.intentName;
        toSend["originalRequest"] = {
            "source": req.body.originalRequest.source
        };
        console.log("Context : " + JSON.stringify(req.body.result));
        
        var cont = req.body.result.contexts.filter(x => {
            return x.name == "actions_intent_option"
        });
        if(cont[0])
            toSend["option"] = cont[0].parameters.OPTION;
        
        console.log("toSend Activity : " + JSON.stringify(toSend));
        var newoptions = {
            host: varHost,
            path: varPath,
            data: toSend,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var body = "";
        var responseObject;

        var post_req = https.request(newoptions, function(response) {
            response.on('data', function(chunk) {
                body += chunk;
            });

            response.on('end', function() {
                try {
                    responseObject = JSON.parse(body);
                    res.json(responseObject);
                } catch (error) {
                    res.json({
                        speech: 'Something went wrong! Please try again later!'
                    })
                }


            })
        }).on('error', function(e) {
            speech = "Error occured! : " + e;
            res.json({
                speech: speech,
                displayText: speech
            })
        });
        post_req.write(JSON.stringify(toSend));
        //post_req.write(tracker);
        post_req.end();
    

}