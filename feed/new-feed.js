
var new_feed = function(req, res) {
    var form_module = require('../forms/new-feed');
    var form = form_module.new_feed;    
    res.render('new.ejs', {
        locals: {
            form: form,
        }
    })
}

exports.new_feed = new_feed;