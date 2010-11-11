var mongoose = require('mongoose').Mongoose;

var db_connection_factory = function() {
    return mongoose.connect('mongodb://localhost/test')
}

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
        },
        absolute_url: function() {
            return '/feeds/' + this.id
        },
        edit_url: function() {
            return this.absolute_url + '/edit'
        }
    },
    
    methods: {
        updateWithFormData: function(data) {
            for (var prop in data)
                this[prop] = data[prop]
        },
    },
})

var feed_model_factory = function(db) {
    return db.model('Feed')
}

var FeedPeer = function() {}
FeedPeer.prototype.createFromFormData = function(data, callback, db) {
    db = db || db_connection_factory()
    var model = feed_model_factory(db)
    var object = new model()
    object.updateWithFormData(data)
    object.save()
    callback(object)
}
FeedPeer.prototype.updateObjectFromFormData = function(object, data, callback) {
    object.updateWithFormData(data)
    object.save()
    callback(object)
}
FeedPeer.prototype.findAll = function(callback, db) {
    db = db || db_connection_factory()
    
    var model = feed_model_factory(db)
    model.find().all(callback)
}
FeedPeer.prototype.findById = function(id, callback, db) {
    db = db || db_connection_factory()
    
    var model = feed_model_factory(db)
    model.findById(id, callback)
}

exports.feed_peer = new FeedPeer()
exports.feed_model_factory = feed_model_factory
