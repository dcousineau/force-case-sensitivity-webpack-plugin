/**
 * Original code credit to Alexandre Kirszenberg. Only modifications made were
 * to fit into newer Webpack plugin structure and publish as an npm module.
 *
 * @see https://gist.github.com/Morhaus/333579c2a5b4db644bd5
 */

var glob = require('glob');

function ForceCaseSensitivityPlugin() {
    //no-op
}

ForceCaseSensitivityPlugin.prototype.apply = function(compiler) {
    compiler.plugin('normal-module-factory', function(nmf) {
        nmf.plugin('after-resolve', function(data, done) {

            var realpath = glob.sync(data.resource, {nocase: true})[0];

            //If realpath is undefined that means glob could not find the file. This
            //was most likely an include likely due to either (A) the file doesn't
            //exist or (B) webpack-dev-server/client?http://localhost:1111/ or
            //similar. Other systems will throw a fatal error if it's case A, so we
            //ignore files that "don't exist"
            if (realpath && realpath !== data.resource) {
                done(new Error('ForceCaseSensitivityPlugin: `' + data.rawRequest + '` does not match the corresponding file on disk `' + realpath + '`'));
            } else {
                done(null, data);
            }

        });
    });
};

module.exports = ForceCaseSensitivityPlugin;
