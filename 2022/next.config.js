/** @type {import('next').NextConfig} */

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nextConfig = {

  env: {
    VERCEL_EMAIL: 'fabricioviazzi@gmail.com',
  },

  reactStrictMode: true,

  swcMinify: true,

  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  webpack: (config, options) => {

    config.module.rules.push({
      test: /\.(css)$/,
      use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
      ]
    },
    {
      test: /\.(less)$/,
      use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
              loader: 'less-loader',
              options: {
                  lessOptions: {
                      javascriptEnabled: true,
                      math: 'parens-division'
                  }
              }
          }
      ]
    });

    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'static/[name].css'
    }));

    return config

  }
}

module.exports = nextConfig
