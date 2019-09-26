// webpack is similar to gulp BUT specialized to only bundle
// ref = https://webpack.js.org/concepts/loaders/

const path = require('path')
//const CopyPlugin = require('copy-webpack-plugin'); // fail = will need to use unix cp or gulp

module.exports = {    
    entry: "./index.web.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        //publicPath: 'web/',
        filename: "js/bundle.js",
        sourceMapFilename: "js/bundle.map"
        },
    devtool: '#source-map',
    resolve: { // per https://medium.com/@slaton.ad/react-async-storage-and-webpack-c2e86661497b
        alias: {
            '@react-native-community/async-storage': 'react-native-web'
            }
        },
    module: {
        rules: [
            // First Rule
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: [ 
                { loader: 'babel-loader' },
                //{ loader: 'react-hot-loader' }
                ]
            },
           // Second Rule
           // requires npm pkg css-loader ; add to package.json
           { 
                test: /\.css$/, 
                //use: ['style-loader']
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
