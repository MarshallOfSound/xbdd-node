var path = require('path'),
    request = require('request'),
    fs = require('fs');

module.exports = {
    sendReport: function(file, options) {
        var defaults = {
            xbddUrl: 'https://xbdd',
            username: 'admin',
            password: 'password'
        };
        if (typeof options !== 'undefined') {
            for (var prop in defaults) {
                if (defaults.hasOwnProperty(prop) && typeof options[prop] === 'undefined') {
                    options[prop] = defaults[prop];
                }
            }
        } else {
            options = defaults;
        }
        var JSONPath = path.resolve(file),
            pattern = new RegExp('(http[s]?:\/\/)(.+)');

        undef(options.product);
        if (typeof options.version === 'object' && options.version.length && options.version.length === 3) {
            options.version = options.version.join('.');
        }
        undef(options.version);
        undef(options.build);

        options.xbddUrl = options.xbddUrl.replace(pattern, '$1' + options.username + ':' + options.password + '@$2');

        fs.readFile(JSONPath, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          sendRequest(options, data);
        });
    }
};

function undef(a) {
    if (typeof a === 'undefined') {
        throw new Error('Product, Version and Build options MUST be defined');
    }
}

function sendRequest(options, data) {
    request({
        url: options.xbddUrl + '/rest/reports/' + [options.product, options.version, options.build].join('/'),
        method: 'PUT',
        strictSSL: false,
        body: data.trim()
    },
    function(e, a, data) {
        if (e !== null) {
            throw new Error("An error occurred connecting to XBDD please ensure the URL you provided is correct and the server is running");
        }
        switch (a.statusCode) {
            case 200:
                console.log("Results successfully sent to XBDD");
                break;
            case 500:
                console.log("Your credentials were rejected by XBDD or your JSON was invalid, try uploading the JSON manually");
                break;
            case 403:
                console.log("You submitted invalid JSON");
                break;
            default:
                console.log("An unknown error occurred, check the node log for more details");
                break;
        }
    });
}
