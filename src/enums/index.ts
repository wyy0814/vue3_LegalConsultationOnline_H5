/* 
    枚举场景类型：用于一组没有语义的可选值，给他们添加类型，从而更加语义化，提高代码可读性
    注意：
        1.枚举有值，所以打包后会生成js代码
        2.只能定义在.ts格式
 */

// 咨询类型
export enum ConsultType {
  /** 找律师（Doctor） */
  Lawyer = 1,
  /** 快速咨询 */
  Fast = 2,
  /** 专业咨询（Medication） */
  answer = 3
}
// 咨询时间，以1自增可以省略
export enum consultTime {
  /** 一周内 */
  Week = 1,
  /** 一月内 */
  Month,
  /** 半年内 */
  HalfYear,
  /** 半年以上 */
  More
}
