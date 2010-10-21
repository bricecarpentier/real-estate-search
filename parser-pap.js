exports.parse = function(body, callback) {
    var jsdom = require('jsdom');

    var parseDate = function(date) {
        var month_convertor = require('./month-convertor');
        var pattern = /([\d]{2}) ([\w]+) ([\d]{4})/;
        var match = date.match(pattern);
        return new Date(match[3], month_convertor.convert(match[2]), match[1]);
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
                           .text(),
                prix: that.find('.prix').text(),
                surface: that.find('.surface').text(),
                'date': parseDate(that.find('.date-publication').text()),
                description: that.find('.annonce-resume-text').html(),
                url: that.find('h2 > a').attr('href'),
            };
            return o;
        }));
    });
}
