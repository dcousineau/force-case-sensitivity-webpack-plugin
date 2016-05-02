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

      if (realpath !== data.resource) {
        done(new Error('ForceCaseSensitivityPlugin: `' + data.resource + '` does not match the corresponding file on disk `' + realpath + '`'));
      } else {
        done(null, data);
      }

    });
  });
};

module.exports = ForceCaseSensitivityPlugin;
