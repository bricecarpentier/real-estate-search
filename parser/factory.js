exports.build = function(url) {
    var urlmod = require('url');
    
    var o = urlmod.parse(url);
    var parserName = '';
    switch (o.hostname) {
        case 'www.pap.fr':
            parserName = 'pap';
            break;
        case 'www.leboncoin.fr':
            parserName = 'lbc';
            break;
    }

    var parser = require('./' + parserName);
    return new parser.Parser();
};
