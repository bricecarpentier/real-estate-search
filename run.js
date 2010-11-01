var sys             = require('util'),
    express         = require('express'),
    feed            = require('./feed');

var app = express.createServer();

app.get('/feed.rss', feed.feed);

app.listen(3000);