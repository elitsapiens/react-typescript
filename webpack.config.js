const path = require('path') //절대경로를 참조하기 위해 path를 불러오기
const HtmlWebpackPlugin = require('html-webpack-plugin') //웹팩에서 HTML을 다루기위한 플로그인을 불러오기
// Typescript(타입스크립트)를 빌드할 때 성능을 향상시키기 위한 플러그인를 불러오기
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

const mode = process.env.NODE_ENV || 'development'

// console.log(__dirname);
// console.log(path.resolve(__dirname, 'dist'));
// console.log(path.resolve(__dirname, 'src/components'));
module.exports = {
    mode,
    devtool: 'eval-source-map',

    // 번들 파일로 만들기 위한 시작 파일(entry)을 설정
    //생성될 번들 파일은 js 폴더 하위에 app.js라는 이름으로 생성
    //이 파일은 ./src/App.jsx를 시작으로 번들링(하나로 합치기)합니다.
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        // Resolve in this order
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.md'],
        // Allow `@/` to map to `src/client/`
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        // Typescript(타입스크립트)의 컴파일 속도 향상을 위한 플러그인을 설정
        new ForkTsCheckerWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env),
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        open: true,
        // devMiddleware: {publicPath: '/dist/'}, //생성해주는 경로
        // static: {directory: path.resolve(__dirname)}, //실제 경로`
        port: 3000,
    },
}
