/* 
    用户相关ts类型
*/

// 登录接口返回数据的类型
export type User = {
  token: string // token令牌
  id: string // 用户ID
  account: string // 用户名称
  mobile: string // 手机号
  avatar: string // 头像
}

// 个人信息
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  likeNumber: number // 关注
  collectionNumber: number // 收藏
  score: number // 积分
  couponNumber: number // 优惠券
  orderInfo: {
    paidNumber: number // 待付款
    receivedNumber: number // 待发货
    shippedNumber: number // 待收货
    finishedNumber: number // 已完成
  }
}

// 家庭档案-用户信息
export interface Patient {
  id?: string /** 患者ID */
  name: string /** 患者名称 */
  idCard: string /** 身份证号 */
  defaultFlag: 0 | 1 /** 0不默认  1默认 */
  gender: 0 | 1 /** 0 女  1 男 */
  age?: number /** 年龄 */
}

// 家庭档案-用户信息列表
export type PatientList = Patient[]
