var forms       = require('forms'),
    fields      = forms.fields,
    validators  = forms.validators;

var edit = forms.create({
    name: fields.string({required: true})
});

exports.edit = edit;
