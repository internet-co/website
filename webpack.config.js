const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let srcPath = path.resolve(__dirname, "src");
let distPath = path.resolve(__dirname, "docs");

let config = {
    watchOptions: {
        ignored: [/node_modules/]
    },
    entry: {
        "app": path.join(srcPath, "App.tsx")
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyPlugin([
            { from: path.join(__dirname, "index.html"), to: distPath, flatten:true },
            { from: path.join(__dirname, "src/media/favicon"), to: distPath, flatten:true }
        ]),
    ],
    output: {
        path: distPath,
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: [/\.js\.map$/, /\.d\.ts$/, /\.d\.tsx$/, /Config\.ts/, /Config\.js/],
                loader: "ignore-loader"
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: "ts-loader",
                    options: {}
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ""
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader?name=[name].[ext]"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};


module.exports = (env, argv) => {

    if (argv.mode === "development") {
        config.devtool = "source-map";
    }

    return config;
};
