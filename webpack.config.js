const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin'); //prod

//const extractCSS = new ExtractTextPlugin('../css/style.css'); //prod

module.exports = {

    entry: [
        'babel-polyfill', 
        path.resolve(__dirname, 'src/js/index.js')
    ],

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.js',
        publicPath: '/dist/'
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src/js'),
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },

            {
                test: /\.scss$/,
                //dev
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'postcss-loader',
                    'sass-loader'
                ]

                //prod
                /* use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        'postcss-loader',
                        'sass-loader'
                    ]
                }) */
            }
        ]
    },

    plugins: [
        //extractCSS, //prod
        new webpack.HotModuleReplacementPlugin() //required to use HMR
    ],

    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), //path to location where files are served; here /dist because there is index.html file
        inline: true, //script with HMR is injected to output file
        hot: true, //live reload and hot module replacing
        port: 3000,
        historyApiFallback: true,
        publicPath: '/js/' //if we wrote here '/' we could include output file with '/app.js' (because we named it 'app.js' in output.filename) in our .html file
    }
};