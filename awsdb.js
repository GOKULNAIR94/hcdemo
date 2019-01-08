module.exports = function ( qString, req, resp, callback){

    console.log("Header :" + JSON.stringify(req.body.headers));
    var sql = require("mssql");
    var sqlConfig = {
        user: req.body.headers.sqluser,
        password: req.body.headers.sqlpw,
        server: req.body.headers.sqlserver,
        database: 'viki'
    }
    console.log("SQL :" + JSON.stringify(sqlConfig));
    console.log("Qstring : " + qString);
    sql.connect(sqlConfig, function(err) {
        var request = new sql.Request();
        request.query( qString, function(err, output) {
            if (err){ 
                console.log(err);
                sql.close();
                resp.json({
                    message : "Unable to process your request. Please try again later."
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
