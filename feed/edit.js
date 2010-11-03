var form_module = require('../forms/edit');
var models = require('../models');

var get_edit_feed = function(req, res) {
    var render = function(obj) {
        var form = form_module.edit;
        if (obj) {
            form.bind(obj);
        }
        res.render('feed/edit.ejs', {
            locals: {
                form: form,
                flash: req.flash()
            }
        })
    };

    if (req.params.id) {
        models.Feed.findById(req.params.id, function(feed) {
            render(feed);
        });
    } else {
        render(null);
    }
}

var post_edit_feed = function(req, res) {
    var form = form_module.edit;
    form.handle(req, {
        success: function(form) {
            var feed = new models.Feed();
            feed.name = form.data.name;
            feed.save();
            req.flash('info', 'Le feed "%s" a bien été créé', feed.name);
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
