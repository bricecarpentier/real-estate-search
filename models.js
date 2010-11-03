var mongoose = require('mongoose').Mongoose;

mongoose.model('Feed', {
    properties: [
        'name',
        {searches: [[
            'url',
            {ads: [[
                'title',
                'url',
                'price',
                'surface',
                'description',
                'created_on',
                'updated_on'
            ]]}
        ]]}
    ],

    getters: {
        id: function() {
            return this._id.toHexString();
        }
    }
})

var db = mongoose.connect('mongodb://localhost/test');

exports.Feed = db.model('Feed');
