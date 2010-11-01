exports.convert = function(str) {
    var values = {
        'janvier': 0,
        'février': 1,
        'mars': 2,
        'avril': 3,
        'mai': 4,
        'juin': 5,
        'juillet': 6,
        'aout': 7,
        'septembre': 8,
        'octobre': 9,
        'novembre': 10,
        'décembre': 11
    }
    return values[str];
}