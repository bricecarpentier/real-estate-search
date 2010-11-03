var sys             = require('util'),
    express         = require('express'),
    feed            = require('./feed');

var app = express.createServer();

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/feed.rss', feed.display);

app.get('/feed/new', feed.get_edit_feed);
app.post('/feed/new', feed.post_edit_feed);
app.get('/feed/:id', feed.get_edit_feed);
app.post('/feed/:id', feed.post_edit_feed);

app.listen(3000);
