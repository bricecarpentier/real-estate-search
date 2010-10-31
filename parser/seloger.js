var sys         = require('util'),
    events      = require('events'),
    jsdom       = require('jsdom'),
    url         = require('url'),
    parser_base = require('./index');

var Parser = function() {
    events.EventEmitter.call(this);
}

sys.inherits(Parser, events.EventEmitter);

Parser.prototype.parse = function(body) {
    var self = this;
    var window = jsdom.jsdom(body).createWindow();
    
    var parseSurface = function(s) {
        var pattern = /.* ([\d,]+ m²)$/;
        var match = s.match(pattern);
        if (match) {
            return match[1];    
        } else {
            return null;
        }
        
    };
    
    var parseDate = function(s) {
        var pattern = /([\d]{2})\/([\d]{2})\/([\d]{4})/;
        var match = s.match(pattern);
        if (match) {
            return new Date(match[3], match[2]-1, match[1]);
        } else {
            return null;
        }
    }
    
    jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.2.js', function() {
       
       var links = window.jQuery('.ann_ann');
       
       var objects = window.jQuery.map(links, function(item) {
           var that = window.jQuery(item);
           
           var o = {
               titre: that.find('.rech_libinfo a').text().trim(),
               url: that.find('.rech_libinfo a').attr('href'),
               prix: that.find('.rech_box_prix').text().trim(),
               updated_on: parseDate(that.find('.rech_majref')
                                         .contents()[2]
                                         .nodeValue
                                         .split('-')[0]
                                         .trim()),
               description: that.find('.acc_detail')[0]
                                .previousSibling.nodeValue.trim(),
           };
           o.surface = parseSurface(o.titre);
           
           return o;
       });
       
       self.emit(parser_base.END, objects);
    });
}

exports.Parser = Parser;