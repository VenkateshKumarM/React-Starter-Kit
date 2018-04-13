const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports ={
    entry:"./src/app.js",
    output: {
        path: path.resolve(__dirname+'/dist/'),
        filename: 'app.bundle.js'
    },
    devServer:{
        contentBase: path.join(__dirname,"/dist"),
        compress: false,
        port: 9000,
        stats: "errors-only",
        open: true
    },
    module:{
        rules: [{
            test:/\.css$/, 
            use:ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
                publicPath: "/dist"
            })
                
        },
        {
            test:/\.js$/, use:'babel-loader', exclude: /node_modules/
        }
    ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Project',   
        hash: true,
        template: './src/index.html'
    }),
    new ExtractTextPlugin({
        filename: "app.css",
        disable: false,
        allChunks: true
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
    })
]    
}