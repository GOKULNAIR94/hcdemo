module.exports = function ( speech, suggests, contextOut, req, res, callback){ 

    switch(req.body.originalRequest.source) {
        case "google":{
            res.json({
                speech: speech,
                displayText: speech,
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
                                    'displayText': speech
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
                displayText: speech
            });
            break;
        }

        default:{
            res.json({
                speech: speech,
                displayText: speech
            });
        }
    }
}
