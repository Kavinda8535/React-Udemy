const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    watch: true, // when we set this into true web pack will bundle it automatically.
    module:{
        loaders: [{
                test:/\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }
        ]
    }
}