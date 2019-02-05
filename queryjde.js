module.exports = function( xmlbody , request, response) {

    var http = require("https");
    var date = require('date-and-time');

    var d = new Date();
    //d.setMinutes(d.getMinutes() - 100);
    var timestamp = date.format(d, 'YYYY-MM-DDTHH:mm:ss');
    console.log("timestamp : " + timestamp);
	
	var xmlreq = "<soapenv:Envelope xmlns:orac=\"http://oracle.e1.bssv.JP010020/\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"><soapenv:Header><wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\"><wsse:UsernameToken wsu:Id=\"UsernameToken-B47E58B0D0672C98DB154698139362911\"><wsse:Username>jde</wsse:Username><wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">jde</wsse:Password><wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">OwDzfD+0zISwmPs+8SDwrA==</wsse:Nonce><wsu:Created>" + timestamp + ".000Z</wsu:Created></wsse:UsernameToken></wsse:Security></soapenv:Header><soapenv:Body>" + xmlbody + "</soapenv:Body></soapenv:Envelope>";


    var options = {
        "method": "POST",
        "hostname": "10.151.66.5",
        "rejectUnauthorized": false,
        "port": "8004",
        "path": "/DV920/CustomerManager?WSDL",
        "headers": {
            "content-type": "text/xml",
            "cache-control": "no-cache"
        }
    };

    var req = http.request(options, function(res) {
        var chunks = "";

        res.on("data", function(chunk) {
            chunks += chunk;
        });

        res.on("end", function() {
            var body = chunks;
            //console.log(body);
            

        });

        res.on("error", function(e) {
            console.log("Error = " + e);
        });
		
        req.write("<soapenv:Envelope xmlns:orac=\"http://oracle.e1.bssv.JP010020/\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n   <soapenv:Header>\r\n      <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\r\n         <wsse:UsernameToken wsu:Id=\"UsernameToken-B47E58B0D0672C98DB154698139362911\">\r\n            <wsse:Username>JDE</wsse:Username>\r\n            <wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">JDE</wsse:Password>\r\n            <wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">OwDzfD+0zISwmPs+8SDwrA==</wsse:Nonce>\r\n            <wsu:Created>" + timestamp + ".000Z</wsu:Created>\r\n         </wsse:UsernameToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <orac:getCustomerCreditInformation>\r\n         <entity>\r\n            <!--Optional:-->\r\n            <entityId>4242</entityId>\r\n         </entity>\r\n      </orac:getCustomerCreditInformation>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>");
        //req.write("<soapenv:Envelope xmlns:orac=\"http://oracle.e1.bssv.JP010020/\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n   <soapenv:Header>\r\n      <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\r\n         <wsse:UsernameToken wsu:Id=\"UsernameToken-B47E58B0D0672C98DB154698139362911\">\r\n            <wsse:Username>JDE</wsse:Username>\r\n            <wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">JDE</wsse:Password>\r\n            <wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">OwDzfD+0zISwmPs+8SDwrA==</wsse:Nonce>\r\n            <wsu:Created>2019-01-10T14:44:36.628Z</wsu:Created>\r\n         </wsse:UsernameToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n      <orac:getCustomerCreditInformation>\r\n         <entity>\r\n            <!--Optional:-->\r\n            <entityId>4242</entityId>\r\n         </entity>\r\n      </orac:getCustomerCreditInformation>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>");
        req.end();
    });
}