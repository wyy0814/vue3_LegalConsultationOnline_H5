/* 
    该插件不能把行内样式的px转为vw
*/
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 设备宽度375计算vw的值
      viewportWidth: 375
    }
  }
}
