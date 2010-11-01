var forms       = require('forms'),
    fields      = forms.fields,
    validators  = forms.validators;

var new_field = forms.create({
    name: fields.string({required: true})
});

exports.new_field = new_field;