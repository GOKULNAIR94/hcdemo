module.exports = function ( speech, text, suggests, contextOut, req, res, callback){ 
    if(speech == "")
        speech = text;

    switch(req.body.originalRequest.source) {
        case "google":{
            res.json({
                speech: speech,
                displayText: text,
                contextOut : contextOut,
                data: {
                    google: {
                        'expectUserResponse': true,
                        'isSsml': false,
                        'noInputPrompts': [],
                        'richResponse': {
                            'items': [{
                                'simpleResponse': {
                                    'textToSpeech': speech,
                                    'displayText': text
                                }
                            }],
                            "suggestions": suggests
                        }
                    }
                }
            });
            break;
        }
            
        case "facebook":{
            res.json({
                speech: speech,
                displayText: text
            });
            break;
        }

        default:{
            res.json({
                speech: speech,
                displayText: text
            });
        }
    }
}
