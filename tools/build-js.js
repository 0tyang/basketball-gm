// Used to be:
// browserify -d -p [minifyify --map app.js.map --output gen/app.js.map] js/app.js -o gen/app.js
// ...but then https://github.com/ben-ng/minifyify/issues/116 made it too complicated.

var browserify = require('browserify');
var fs = require('fs');

var bundler = new browserify({debug: true});

bundler.add('js/app.js');

bundler.plugin('minifyify', {
    map: '/gen/app.js.map',
    uglify: {
        // https://github.com/ben-ng/minifyify/issues/116
        mangle: {
            except: ['require']
        },
        sourceRoot: '/' // This has no affect on anything, I'm not sure why. Instead all my paths contain /gen, sigh.
    }
});

bundler.bundle(function (err, src, map) {
    if (err) {
        throw err;
    }

    fs.writeFileSync('gen/app.js', src);
    fs.writeFileSync('gen/app.js.map', map);
});