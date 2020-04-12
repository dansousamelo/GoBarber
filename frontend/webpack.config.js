const path = require('path');

module.exports = {
    //__dirname é o root, entro na src e procuro pelo arquivo index
    entry: path.resolve(__dirname, 'src', 'index.js'),

    // Arquivo gerado
    output:{
        path: path.resolve(__dirname, 'public'),
        filename:'bundle.js'
    },
    devServer:{
        // Qual o caminho pro diretório que possui os arquivos publicos da aplicação
        contentBase: path.resolve(__dirname, 'public'),
    },
    module:{
        rules:[
            {
                /**
                 * Quando acharmos um arquivo que termine com .js
                 * e não esteja dentro de node_modules
                 * use o babel.
                 */
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.css$/,
                exclude: /node_modules/,
                // css-loader lê o arquivo css e interpreta as importações lá dentro
                // style-loader pega o css interpretado e injeta dentro do HTML
                use:[
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test:/.*\.(gif|png|jpe?g)$/i,
                use:{
                    loader: 'file-loader',
                }
            }
        ]
    }

};