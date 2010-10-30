var sys             = require('util'),
    request         = require('request'),
    ejs             = require('ejs'),
    fs              = require('fs'),
    downloader      = require('./downloader'),
    parser_factory  = require('./parser-factory');

var url = 'http://www.pap.fr/annonce/vente-appartement-loft-atelier-maison-lyon-1er-g35369g35370g35371g35372g35374g35375g35376g35377';

var template = fs.readFileSync('./template.js', 'utf8');

var render = function(items) {
    sys.puts(ejs.render(template, {
        locals: {
            items:items
        }
    }));
}

var d = new downloader.Downloader();
d.on(downloader.STEP, function(downloadedData) {
    var parser = parser_factory.build(downloadedData.url);
    parser.parse(downloadedData.data, render);
})
d.downloadURL(url);