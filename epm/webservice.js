module.exports = function(input, anaConfig, reqp, resp, callback) {
    var http = require("https");
    var intentName = reqp.body.result.metadata.intentName;
    console.log("qString : " + input.qString);
    console.log("body : " + JSON.stringify(input.body));


    var options = {
        "method": "POST",
        "hostname": "epbcs190141-epbcs-bjdn8pft.srv.ravcloud.com",
        //      "port": "9000",
        "path": input.qString,
        "headers": {
            "authorization": "Basic ZXBtX2RlZmF1bHRfY2xvdWRfYWRtaW46ZXBtRGVtMHM=",
            "cache-control": "no-cache",
            "content-type": "application/json"
        }
    };

    if (intentName == "EPM_Jobs - custom" || intentName == "EPM_JobStatus") {
        options.method = "GET";
    }

    var req = http.request(options, function(res) {
        var chunks = [],
            resObj = {};

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function() {
            try {
                var result = Buffer.concat(chunks);
                console.log(result.toString());
                resObj = JSON.parse(result.toString());
                callback(resObj);
            } catch (e) {
                console.log("Error: " + e);
                resp.json({
                    speech: "Unble to process your request. Please try again later."
                });
            }
        });
    });
    
    if ( options.method == "POST" ) {
        req.write(JSON.stringify(input.body));
    }
    req.end();
}