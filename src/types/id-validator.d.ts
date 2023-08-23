declare module 'id-validator' {
  // 默认导出的,class是es6的类语法,对应es5的构造函数
  export default class {
    // es6类中的方法,对应es5中的原型方法
    isValid(id: string): boolean
    getInfo(id: string): {
      sex: number
    }
  }
}
