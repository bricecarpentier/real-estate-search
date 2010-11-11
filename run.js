var sys             = require('util'),
    express         = require('express'),
    feed            = require('./feed'),
    models          = require('./models'),
    forms           = require('./forms'),
    generics        = require('../generic-crud');

var app = express.createServer();
app.use(express.bodyDecoder());
app.use(express.cookieDecoder());
app.use(express.session());
app.use(express.methodOverride());

app.get('/feeds/', generics.object_list(models.feed_peer.findAll, 'index.ejs'));

app.post('/feeds/', generics.object_create(models.feed_peer.createFromFormData, forms.edit));
app.get('/feeds/new', generics.direct_to_template('feed/edit.ejs', {
    form: forms.edit,
    object: null
}));

app.get('/feeds/:id.rss', feed.display);
app.put('/feeds/:id', generics.object_update(models.feed_peer.findById,
                                             models.feed_peer.updateObjectFromFormData,
                                             forms.edit));
app.delete('/feeds/:id', generics.object_delete(models.feed_peer.findById, '/feeds/'));
app.get('/feeds/:id/edit', generics.object_detail(models.feed_peer.findById,
                                                  'feed/edit.ejs',
                                                  {form: forms.edit}));
app.get('/feeds/:id/delete', generics.object_detail(models.feed_peer.findById, 'feed/delete.ejs'))

app.listen(3000);
