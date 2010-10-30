var sys             = require('util'),
    request         = require('request'),
    ejs             = require('ejs'),
    fs              = require('fs'),
    downloader      = require('./downloader'),
    parser          = require('./parser'),
    parser_factory  = require('./parser-factory');

var url = 'http://www.pap.fr/annonce/vente-appartement-loft-atelier-maison-lyon-1er-g35369g35370g35371g35372g35374g35375g35376g35377';

var template = fs.readFileSync('./template.js', 'utf8');

var render = function(items) {
    items.sort(function(a,b) {
        return a.created_on - b.created_on;
    })
    
    sys.puts(ejs.render(template, {
        locals: {
            items:items
        }
    }));
}

var nb = 1;
var liste = [];

var store = function(items) {
    nb--;
    
    for (var i=0 ; i<items.length ; i++) {
        liste.push(items[i]);
    }
    
    if (nb == 0) {
        render(liste);
    }
}


var d = new downloader.Downloader();
d.setURLs([url]);
d.on(downloader.STEP, function(downloadedData) {
    var p = parser_factory.build(downloadedData.url);
    p.once(parser.END, store)
    p.parse(downloadedData.data);
})
d.on(downloader.ERROR, function() {
    nb--;
    sys.puts('fail');
})
d.download();