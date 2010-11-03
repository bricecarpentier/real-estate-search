var sys             = require('util'),
    express         = require('express'),
    feed            = require('./feed'),
    models          = require('./models');

var app = express.createServer();
app.use(express.cookieDecoder());
app.use(express.session());

app.get('/', function(req, res) {
    models.Feed.find().all(function(feeds) {
        res.render('index.ejs', {
            locals: {
                flash: req.flash(),
                feeds: feeds
            }
        });
    });
});

app.get('/feed.rss', feed.display);

app.get('/feed/new', feed.get_edit_feed);
app.post('/feed/new', feed.post_edit_feed);
app.get('/feed/:id', feed.get_edit_feed);
app.post('/feed/:id', feed.post_edit_feed);

app.listen(3000);
