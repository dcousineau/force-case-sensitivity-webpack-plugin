/**
 * Original code credit to Alexandre Kirszenberg. Only modifications made were
 * to fit into newer Webpack plugin structure and publish as an npm module.
 *
 * @see https://gist.github.com/Morhaus/333579c2a5b4db644bd5
 */

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

function ForceCaseSensitivityPlugin() {
  //no-op
}

ForceCaseSensitivityPlugin.prototype.apply = function(compiler) {
  compiler.plugin('normal-module-factory', function(nmf) {
    nmf.plugin('after-resolve', function(data, done) {
      var parentDir = path.dirname(data.resource);
      var resourceName = path.basename(data.resource);
      
      //Ensure the file exists, it's possible we have a webpack-hot-loader file with get params that other webpack plugins understand
      //e.g. .../node_modules/webpack-dev-server/client/index.js?http://localhost:3000
      //We'll let webpack figure out if a file doesn't exist
      fs.exists(parentDir + "/" + resourceName, function (exists) {
        if (exists) {
          fs.readdir(parentDir, function(err, files) {
            if (err) {
              done(err);
            }
            if (files.indexOf(resourceName) === -1) {
              var realName = _.find(files, function(filename) {
                return filename.toLowerCase() === resourceName.toLowerCase()
              });
              done(new Error('ForceCaseSensitivityPlugin: `' + resourceName + '` does not match the corresponding file on disk `' + realName + '`'));
              return;
            }
            done(null, data);
          });
        } else {
          done(null, data);
        }
      });

    });
  });
};

module.exports = ForceCaseSensitivityPlugin;
