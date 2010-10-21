var sys            = require('util'),
    request        = require('request'),
    ejs            = require('ejs'),
    fs             = require('fs'),
    parser_factory = require('./parser-factory');

var url = 'http://www.pap.fr/annonce/vente-appartement-loft-atelier-maison-lyon-1er-g35369g35370g35371g35372g35374g35375g35376g35377';

var template = fs.readFileSync('./template.js', 'utf8');

var parser = parser_factory.build(url);

var render = function(items) {
    sys.puts(ejs.render(template, {
        locals: {
            items:items
        }
    }));
}

request({uri:url}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var items = parser.parse(body, function(items) {
//            console.log(items)
            render(items)
        });
    }
});

