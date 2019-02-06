module.exports = function( dummy, anaConfig, req, res, callback) {
    var CustNum = req.body.result.parameters.CustNum;
    var CustName = req.body.result.parameters.CustName;
    CustName = CustName.replace(/[^\w\s]/gi, '');
    var jde_attrib = req.body.result.parameters.jde_attrib;

	var qString = "";
	var speech = "";
	var text = "";
	
    console.log("Cust Num = " + CustNum + "\nCust Name =" + CustName + "\njde_attrib =" + jde_attrib);
    if ((CustNum == "" || CustNum == null) && (CustName == "" || CustName == null)) {
        speech = "Please provide the Customer name or number.";
        text = "Please provide the Customer name or number. If you are not sure, please try to provide the first few letters of the Customer Name";
        res.json({
            speech : speech,
            displayText : text
        });
    } else {
        if (CustNum == "" || CustNum == null) {
            qString = "Select * from jde WHERE CustName  = '" + CustName + "'";
            callback(qString);
        } else if (CustName == "" || CustName == null) {
            qString = "Select * from jde WHERE CustNum  = " + CustNum;
            callback(qString);
        } else {
            speech = "Unable to process your request. Please try again later.";
            res.json({
                speech : speech,
                displayText : speech
            });
        }
    }
}