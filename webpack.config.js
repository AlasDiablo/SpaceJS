const path = require('path');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'production',
    entry: ['./src/index.js'],
    output: {
        library: 'SpaceJS',
        libraryTarget: 'assign-properties',
        path: path.resolve(__dirname, 'dist'),
        sourceMapFilename: 'space.js.map',
        filename: 'space.min.js',
    },
    plugins: [
        new UnminifiedWebpackPlugin(),
    ],
};
