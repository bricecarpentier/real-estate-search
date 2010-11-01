
var sys         = require('sys'),
    ejs         = require('ejs'),
    downloader  = require('./downloader'),
    parser      = require('./parser');

var feed = function(req, res) {
    url_liste = [
        //'http://www.pap.fr/annonce/vente-appartement-loft-atelier-maison-lyon-1er-g35369g35370g35371g35372g35374g35375g35376g35377',
        'http://www.seloger.com/recherche.htm?pxbtw=NaN/NaN&surfacebtw=40/NaN&idtt=2&nb_pieces=all&idtypebien=1,2&=&nb_chambres=all&tri=d_dt_crea&fakeci=690123&ci=690381,690382,690383,690384,690385,690386,690387,690388,690389&idqfix=1&BCLANNpg=1#pxbtw:NaN;NaN/surfacebtw:40;NaN/idtt:2/nb_pieces:all/idtypebien:1,2,9/:/nb_chambres:all/tri:d_dt_crea/fakeci:690123/ci:690381,690382,690383,690384,690385,690386,690387,690388,690389/idqfix:1/BCLANNpg:1',
        //'http://www.seloger.com/recherche.htm?pxbtw=NaN/NaN&surfacebtw=40/NaN&idtt=2&nb_pieces=all&idtypebien=1,2,9&=&nb_chambres=all&tri=a_px&fakeci=690123&ci=690381,690382,690383,690384,690385,690386,690387,690388,690389&idqfix=1&BCLANNpg=1',
    ];
    
    var render = function(items) {
        items.sort(function(a,b) {
            return a.created_on - b.created_on;
        })

        res.render('template.ejs', {
            locals: {
                items:items
            },
            layout: false,
            headers: {'Content-Type': 'application/rss+xml',},
        });
    }

    var nb = 1;
    var liste = [];

    var store = function(items) {
        nb--;

        for (var i=0 ; i<items.length ; i++) {
            liste.push(items[i]);
        }

        if (nb == 0) {
            render(liste);
        }
    }


    var d = new downloader.Downloader();
    d.setURLs(url_liste);
    d.on(downloader.STEP, function(downloadedData) {
        var p = parser.factory.build(downloadedData.url);
        p.once(parser.END, store)
        p.parse(downloadedData.data);
    })
    d.on(downloader.ERROR, function() {
        nb--;
        sys.puts('fail');
    })
    d.download();
}

exports.feed = feed;