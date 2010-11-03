var sys             = require('util'),
    express         = require('express'),
    feed            = require('./feed');

var app = express.createServer();

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/feed.rss', feed.display);
app.get('/feed/new', feed.new_feed)

app.listen(3000);
