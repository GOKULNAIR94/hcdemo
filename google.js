module.exports = function ( req, res, callback){ 
    var google = require('google');
    
    var speech = "OK";
    var suggests = [];
    var contextOut = [];
    
    google.resultsPerPage = 25
    var nextCounter = 0

    google('node.js best practices', function (err, resp){
      if (err) console.error(err)

      for (var i = 0; i < resp.links.length; ++i) {
        var link = resp.links[i];
        console.log(link.title + ' - ' + link.href)
        console.log(link.description + "\n")
      }

      if (nextCounter < 4) {
        nextCounter += 1
        if (resp.next) resp.next()
      }
        SendResponse(speech, suggests, contextOut, req, res, function() {
            console.log("Finished!");
        });
    })
}