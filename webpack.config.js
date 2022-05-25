// External modules
const path    = require('path')

// Plugins
const Dotenv = require('dotenv-webpack')

module.exports = (env, argv) => {

  // Check if saving process ID was requested
  if (process.argv.includes('SAVEPID')) {
    savepid()
  }

  return {

    mode: argv.mode,

    devtool: argv.mode === 'development' ? 'inline-source-map' : false,

    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      port: 9000,
      static: {
        directory: path.resolve(__dirname, 'dist')
      }
    },

    watchOptions: {
      ignored: ['node_modules/**']
    },

    entry: {
      scripts: ['./src/index.js']
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      chunkFilename: 'js/[name].chunk.js',
      filename: 'js/scripts.min.js'
    },

    module: {

      rules: [
        {

          test: /\.jsx?$/,

          include: [
            path.resolve(__dirname, 'src')
          ],

          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],

          loader: 'babel-loader',

          options: {
            presets: ['@babel/preset-env', '@babel/react']
          },

          type: 'javascript/auto'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {

          test: /\.less$/,

          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'less-loader',
              options: {
                sourceMap: argv.mode === 'development'
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]'
          }
        }
      ]
    },

    resolve: {
      alias: {

        // Dist aliases
        Dist: path.resolve(__dirname, 'dist/'),

        // React aliases
        Assets: path.resolve(__dirname, 'src/Assets/'),
        Context: path.resolve(__dirname, 'src/App.context.jsx'),
        Helpers: path.resolve(__dirname, 'src/Helpers/'),
        Hooks: path.resolve(__dirname, 'src/Hooks/'),
        Components: path.resolve(__dirname, 'src/Components/'),
        Router: path.resolve(__dirname, 'src/Router'),
        Screens: path.resolve(__dirname, 'src/Screens/'),

        // Less aliases
        Less: path.resolve(__dirname, 'src/Less'),
        Fonts: path.resolve(__dirname, 'dist/public/default/font/')

      },

      extensions: ['.js', '.jsx', '.less', '...']

    },

    plugins: [
      new Dotenv({ systemvars: true, defaults: true })
    ]
  }
}

function savepid () {

  // Use this command to save process id 'npm start --inline --hot --define SAVEPID'

  // Require modules
  const process = require('process')
  const fs      = require('fs')

  // Store Process ID
  try {
    // Store PID to be killed
    const pid = `${process.pid}`

    fs.writeFile('./.process-id', pid, function (err) {
      if (err) throw err
      console.log('\x1b[91m%s\x1b[0m', 'Process Id Saved \n')
    })

  } catch (e) { }
}
