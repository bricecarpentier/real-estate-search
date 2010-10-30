var sys     = require('util'),
    events  = require('events'),
    request = require('request');

const STEP  = 'STEP',
      ERROR = 'ERROR',
      ALL   = 'ALL';

var Downloader = function() {
    events.EventEmitter.call(this);
    
    this.urls = [];
}

sys.inherits(Downloader, events.EventEmitter);

var onNextDownloadCallback = function() {
    if (this.urls.length == 0) {
        this.emit(ALL);
    }
}

var onDownloadCallback = function(url, error, response, body) {
    if (!error && response.statusCode == 200) {
        this.emit(STEP, {url: url, data: body});
    } else {
        this.emit(ERROR, {url: url});
    }
}

Downloader.prototype.setURLs = function(urls) {
    this.urls = urls;
    
    return this;
}

Downloader.prototype.getURLs = function() {
    return this.urls;
}

Downloader.prototype.downloadURL = function(url) {
    var self = this;
    request({uri:url}, function() {
        var args = [url];
        for (var i=0 ; i<arguments.length ; i++) {
            args.push(arguments[i]);
        }
        onDownloadCallback.apply(self, args);
    })
    return this;
}

Downloader.prototype.downloadNext = function() {
    if (this.urls.length) {
        this.once(STEP, function() {onNextDownloadCallback.apply(this)});
        return this.downloadURL(this.urls.pop());
    }
}

Downloader.prototype.download = function() {
    var self = this;
    var boundDownloadNext = function() {
        self.downloadNext();
    }
    this.on(STEP, boundDownloadNext);
    this.once(ALL, function() {self.removeListener(STEP, boundDownloadNext)});
    return this.downloadNext();
}


exports.STEP    = STEP;
exports.ERROR   = ERROR;
exports.ALL     = ALL;

exports.Downloader = Downloader;