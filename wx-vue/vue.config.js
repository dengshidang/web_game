module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 9587,
    overlay: {
      warnings: true,
      errors: true
    }
  },

  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: ['vux-ui']
    })
  }

}
