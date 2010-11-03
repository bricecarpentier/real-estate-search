var forms       = require('forms'),
    fields      = forms.fields,
    validators  = forms.validators;

var new_feed = forms.create({
    name: fields.string({required: true})
});

exports.new_feed = new_feed;