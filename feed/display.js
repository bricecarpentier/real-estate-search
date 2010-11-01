var sys         = require('util'),
    ejs         = require('ejs'),
    mongoose    = require('mongoose').Mongoose,
    downloader  = require('../downloader'),
    parser      = require('../parser'),
    models      = require('../models');

var display = function(req, res) {
    
    /*url_liste = [
        //'http://www.pap.fr/annonce/vente-appartement-loft-atelier-maison-lyon-1er-g35369g35370g35371g35372g35374g35375g35376g35377',
        'http://www.seloger.com/recherche.htm?pxbtw=NaN/NaN&surfacebtw=40/NaN&idtt=2&nb_pieces=all&idtypebien=1,2&=&nb_chambres=all&tri=d_dt_crea&fakeci=690123&ci=690381,690382,690383,690384,690385,690386,690387,690388,690389&idqfix=1&BCLANNpg=1#pxbtw:NaN;NaN/surfacebtw:40;NaN/idtt:2/nb_pieces:all/idtypebien:1,2,9/:/nb_chambres:all/tri:d_dt_crea/fakeci:690123/ci:690381,690382,690383,690384,690385,690386,690387,690388,690389/idqfix:1/BCLANNpg:1',
        //'http://www.seloger.com/recherche.htm?pxbtw=NaN/NaN&surfacebtw=40/NaN&idtt=2&nb_pieces=all&idtypebien=1,2,9&=&nb_chambres=all&tri=a_px&fakeci=690123&ci=690381,690382,690383,690384,690385,690386,690387,690388,690389&idqfix=1&BCLANNpg=1',
    ];*/
    
    var render = function(items) {
        items.sort(function(a,b) {
            return a.created_on - b.created_on;
        })

        res.render('feed.ejs', {
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

    objects = models.Recherche.find().all(function(array) {
        var url_liste = array.map(function(item) {
            return item.url
        });
        url_liste = url_liste.filter(function(url) {
            return url != undefined
        });
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
    });
}

exports.display = display;
