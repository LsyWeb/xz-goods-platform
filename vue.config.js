module.exports = {
  devServer:{
    proxy:{
      '/api': {
        target: 'http://49.232.130.31:8080',
        pathRewrite: { '^/api': '' },
      },
      
    }
  }
  
}