var form_module = require('../forms/edit');
var models = require('../models');

var post_edit_feed = function(req, res) {
    var save = function(object, data) {
        var _object = object ? object : new models.Feed()
        _object.name = data.name
        _object.save()
        req.flash('info', 'Le feed "%s" a bien été créé', _object.name);
        res.redirect('/feeds/' + _object.id + '/edit');
    }
    
    var form = form_module.edit;
    form.handle(req.body, {
        success: function(form) {
            if (req.params.id) {
                models.Feed.findById(req.params.id, function(object) {
                    save(object, form.data)
                })
            } else {
                save(null, form.data)
            }
        },
        error: function(form) {
            req.flash('error', 'Le feed n\'a pas pu être créé');
            res.redirect('back');
        },
        empty: function(form) {
            
        }
        
    })
}

exports.post_edit_feed = post_edit_feed;
