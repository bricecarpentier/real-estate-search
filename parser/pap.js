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
    var BASE_URL = 'http://www.pap.fr';

    var parseDate = function(date, pattern) {
        var month_convertor = require('../utils/month-convertor');
        var match;
        var dateObj = new Date();
        
        match = date.match(pattern);
        
        var date = null;
        
        if (match && match.length == 4) {
            date = new Date(match[3], month_convertor.convert(match[2]), match[1]);
        }
        
        return date;
    };

    var window = jsdom.jsdom(body).createWindow();
    jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.2.js',     
                    function() {     
        var links = window.jQuery('div.annonce-resume');
        
        var objects = window.jQuery.map(links, function(item) {
            var that = window.jQuery(item);
            var o = {
                titre: that.find('h2 > a')
                           .contents()
                           .not('.prix,.surface')
                           .text().trim(),
                prix: that.find('.prix').text().trim(),
                surface: that.find('.surface').text(),
                created_on: parseDate(that.find('.date-publication').text(),
                                      /Annonce nouvelle du  ([\d]{2}) ([\w]+) ([\d]{4})/),
                updated_on: parseDate(that.find('.date-publication').text(),
                                      /Annonce modifiée le ([\d]{2}) ([\w]+) ([\d]{4})/),
                description: that.find('.annonce-resume-text').text(),
                url: url.resolve(BASE_URL, that.find('h2 > a').attr('href')),
            };
            return o;
        });
        
        self.emit(parser_base.END, objects);
    });
}
exports.Parser = Parser;