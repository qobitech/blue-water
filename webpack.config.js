const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // Your existing webpack configuration
  mode: 'production', // Ensure you are in production mode
  devtool: 'source-map', // Generate source maps
  optimization: {
    minimize: true,
    // splitChunks: {
    //   chunks: 'all'
    // }
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true // Remove console logs
          }
        },
        extractComments: false, // Do not extract comments to separate file
        sourceMap: true // Generate source maps
      })
    ]
  },
  plugins: [
    // Gzip compression
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    // Brotli compression
    new CompressionWebpackPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 }, // Maximum compression
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
