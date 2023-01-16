const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['armtoken.net']
  },
  trailingSlash: false,

  // experimental: {
  //   esmExternals: false,
  //   jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  // },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
    }
    config.plugins = [
      ...config.plugins,
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/socket.io-client/dist/socket.io.min.js',
            to: './static/chunks/'
          },
          {
            from: './src/services/shared-worker.js',
            to: './static/chunks/'
          }
        ]
      })
    ]
    return config
  }
}
