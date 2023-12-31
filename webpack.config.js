//const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");

let entryMap = {
    app: "./src/app.ts"
};

/** Create separate html files that contains a correspoding js bundle */
let htmlPlugins = [];
for (key in entryMap) {
    htmlPlugins.push(
        new HTMLWebpackPlugin({
            filename: key + '.html',
            template: "template_" + key + ".html",
            chunks: [key] // without chunk, all js bundles will be added to each html file
        })
    )
}

module.exports = (env, argv) => {
    return {
        mode: 'development',
        devtool: 'source-map',
        devServer: {
            static: {
                directory: path.join(__dirname, 'public/assets'),
                publicPath: "/assets"
            },
            port: 4200, // you can change to any port            
            //proxy: {
                //'/ajax/api': 'https://test-api-server.com'            },
            // Enable hot reloading
            hot: false,
            //inline: true,
            //liveReload: false,
            allowedHosts: "all",
        },

        entry: entryMap,
        output: {
            filename: '[name].[contenthash].bundle.js',
            chunkFilename: '[name].[contenthash].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },

        plugins: [
            new CleanWebpackPlugin(),
            ...htmlPlugins
        ],

        resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { transpileOnly: true }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // Compiles Sass to CSS
                        'sass-loader',
                    ],
                }
            ],
        }
    }

}