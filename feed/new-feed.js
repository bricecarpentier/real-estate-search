var form_module = require('../forms/new-feed');
var models = require('../models');

var get_edit_feed = function(req, res) {
    var form = form_module.new_feed;
    res.render('feed/edit.ejs', {
        locals: {
            form: form,
        }
    })
}

var post_edit_feed = function(req, res) {
    var form = form_module.new_feed;
    form.handle(req, {
        success: function(form) {
            var feed = new models.Feed();
            feed.name = form.data.name;
            feed.save();
            res.redirect('/feed/' + feed._id.toHexString());
        },
        error: function(form) {
            
        },
        empty: function(form) {
            
        }
        
    })
}

exports.get_edit_feed = get_edit_feed;
exports.post_edit_feed = post_edit_feed;
