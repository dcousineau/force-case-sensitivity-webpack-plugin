# force-case-sensitivity-webpack-plugin

This is a plugin for Webpack that forces import statements to match case with
the target file on the disk.

Issues arise when developers (like myself) work on OSX machines with
case-insensitive file systems and deploy to Linux servers that do have
case-sensitive file systems. This plugin will break the build when a difference
in case is discovered:

> Module not found: Error: ForceCaseSensitivityPlugin: 'ThisFile.js' does not match the corresponding file on disk 'thisfile.js'

## Install

```
npm install --save-dev force-case-sensitivity-webpack-plugin
```

## Usage

```javascript
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

var webpackConfig = {
    plugins: [
        new ForceCaseSensitivityPlugin()
    ]
    // other webpack config ...
}
```

## Thanks & Credit

Special thanks and credit to [Alexandre Kirszenberg](https://github.com/Morhaus)
who's [gist](https://gist.github.com/Morhaus/333579c2a5b4db644bd5) I lifted and
formed into this npm module for re-usability.
