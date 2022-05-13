module.exports = {
  devServer:{
    proxy:{
      '/goods': {
        target: 'http://49.232.130.31:8080',
        // pathRewrite: { '^/api': '' },
      },
      
    }
  },
  outputDir:"goods-client",
  publicPath:"./"
  
}