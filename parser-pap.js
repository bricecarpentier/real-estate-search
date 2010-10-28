exports.parse = function(body, callback) {
    var BASE_URL = 'http://www.pap.fr';
    var jsdom = require('jsdom');
    var url = require('url');

    var parseDate = function(date) {
        var month_convertor = require('./month-convertor');
        var pattern_new = /Annonce nouvelle du  ([\d]{2}) ([\w]+) ([\d]{4})/;
        var pattern_maj = /Annonce modifiée le ([\d]{2}) ([\w]+) ([\d]{4})/;
        var match;
        var dateObj = new Date();
        
        match = date.match(pattern_new);
        
        if (match && match.length == 4) {
            return new Date(match[3], month_convertor.convert(match[2]), match[1]);
        } else {
            match = date.match(pattern_maj);
            if (match && match.length == 4) {
                return new Date(match[3], month_convertor.convert(match[2]), match[1]);
            }
        }
        
        return date;
    };

    var window = jsdom.jsdom(body).createWindow();
    jsdom.jQueryify(window, 'http://code.jquery.com/jquery-1.4.2.js',     
                    function() {     
        var links = window.jQuery('div.annonce-resume');
        
        callback(window.jQuery.map(links, function(item) {
            var that = window.jQuery(item);
            var o = {
                titre: that.find('h2 > a')
                           .contents()
                           .not('.prix,.surface')
                           .text().trim(),
                prix: that.find('.prix').text().trim(),
                surface: that.find('.surface').text(),
                created_on: parseDate(that.find('.date-publication').text()),
                description: that.find('.annonce-resume-text').text(),
                url: url.resolve(BASE_URL, that.find('h2 > a').attr('href')),
            };
            return o;
        }));
    });
}
