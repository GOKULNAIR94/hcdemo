module.exports = function( qString, anaConfig, req, res, callback ) {
    
    var sql = require("mssql");
    var sqlConfig = {
        user: anaConfig.webservice.user,
        password: anaConfig.webservice.password,
        server: anaConfig.webservice.server,
        database: anaConfig.webservice.database
    }
    console.log("SQL :" + JSON.stringify(sqlConfig));
    console.log("Qstring : " + qString);
    sql.connect(sqlConfig, function(err) {
        var request = new sql.Request();
        request.query( qString, function(err, output) {
            if (err){ 
                console.log(err);
                sql.close();
                var speech = "Unable to process your request. Please try again later.";
                res.json({
                    speech : speech,
					displayText : speech
                });
            }
            else{
                console.log(JSON.stringify(output)); // Result in JSON format
                sql.close();
                callback( output );
            } 
        });
    });
}