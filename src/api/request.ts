import request from './config';

/**
 * 获取验证码接口
 *
 * @export
 * @param {*} mobile 手机号码
 * @param {*} type 手机类型 HK: 1 CHN: 2
 * @returns
 */
export function getCode(mobile: string, type: number) {
  return request({
    url: '/passport/register',
    method: 'post',
    data: {
      mobile,
      type
    }
  })
}

/**
 * 用户登录/注册接口
 *
 * @export
 * @param {*} mobile 手机号码
 * @param {*} type 手机类型 HK: 1 CHN: 2
 * @param {*} token 手机验证码接口返回的token
 * @param {*} code 验证码信息
 * @returns promise
 */
export function checkCode(mobile: string, type: number, token: string, code: string) { // 验证用户登录验证码
  return request({
    url: '/passport/checkCode',
    method: 'post',
    data: {
      mobile,
      type,
      token,
      code
    }
  })
}

/**
 * 用户登出接口
 *
 * @export
 * @returns promise
 */
export function logout() { 
  return request({
    url: '/passport/logout',
    method: 'post'
  })
}

/**
 * 获取一周菜品接口
 *
 * @export
 * @param {*} offset 偏移量
 * @returns promise
 */
export function getFoodList({offset, placeId}:any) { 
  return request({
    url: '/food/getFoodList',
    method: 'post',
    data: {
      limit: 5,
      offset,
      placeId
    }
  })
}

/**
 * 获取首页菜品详情接口
 *
 * @export
 * @param {*} dateFoodId 菜品id
 * @returns promise
 */
export function getDailyFoods(dateFoodId: number) {
  return request({
    url: '/food/getFoodDetail',
    method: 'get',
    params: {
      dateFoodId
    }
  })
}

/**
 * 创建订单接口，返回订单详情
 *
 * @export
 * @param {*} dateFoodId 当日菜品id
 * @param {*} amount 选择菜品数量
 * @returns promise
 */
export function createOrder(dateFoodId: number, amount:number) {
  return request({
    url: '/order/createNew',
    method: 'get',
    params: {
      dateFoodId,
      amount
    }
  })
}

/**
 * 确认订单接口
 *
 * @export
 * @param {*} orderId 订单id
 * @param {*} payMoney 总金额（含优惠）
 * @param {number} [payment=1] 1:现金支付 2:apple pay 3:google pay 4:微信支付 5:支付宝支付 6:信用卡 7:月票
 * @param {*} token 信用卡支付 apple pay等需要的token,现金支付为空
 * @param {*} remark 用餐备注
 * @param {*} deductionId 优惠id
 * @returns promise
 */
export function confirmOrder(orderId:number, payMoney:number, payment:number = 1, token: string, remark:string, deductionId: number|null) {
  return request({
    url: '/order/confirm',
    method: 'post',
    data: {
      orderId,
      payMoney,
      payment,
      token,
      remark,
      deductionId
    }
  })
}

/**
 * 取消订单接口
 *
 * @export
 * @param {*} orderId 订单id
 * @returns promise
 */
export function cancelOrder(orderId:number) {
  return request({
    url: '/order/cancel',
    method: 'post',
    data: {
      orderId
    }
  })
}

/**
 * 我的订单接口
 *
 * @export
 * @param {*} offset 偏移量,用于下拉加载更多
 * @param {*} status 状态 cancel: -1 ; delivering: 1;finished: 2; all: null
 * @returns promise
 */
export function myOrder({offset, status}:any) {
  return request({
    url: '/order/myOrderList',
    method: 'post',
    data: {
      limit: 5,
      offset,
      status
    }
  })
}

/**
 * 获取选择地区接口
 *
 * @export
 * @returns promise
 */
export function foodPlaces(lat = null, lon = null) {
  return request({
    url: '/food/getDeliveryPlace',
    method: 'get',
    params: {
      lat,
      lon
    }
  })
}

/** 
 * 保存极光推送 registrationId 到后台
 *
 * @export
 * @param {*} registrationId
 * @returns promise
 */
export function saveDevices(registrationId:string) {
  return request({
    url: '/device/save',
    method: 'post',
    data: {
      registrationId
    }
  })
}

/**
 * 验证信用卡是否合法
 *
 * @export
 * @param {*} bankCard 卡片号码
 * @returns promise
 */
export function vaildCard(bankCard:string) {
  return request({
    url: '/member/isBankCardValid',
    method: 'post',
    data: {
      bankCard
    }
  })
}

/**
 * 用户反馈接口
 *
 * @export
 * @param {object} data {content:"",memberInfo:""}
 * @returns promise
 */
export function feedback(data:object) {
  return request({
    url: '/feedback/add',
    method: 'post',
    data
  })
}

/**
 * app首页广告位
 *
 * @export
 * @returns promise
 */
export function adSpace(pagePosition = 1) {
  return request({
    url: '/adSpace/list',
    method: 'get',
    data: {
      pagePosition
    }
  })
}

/**
 * 公告栏
 *
 * @export
 * @returns promise 为一条公告的老接口
 */
export function queryLatest() {
  return request({
    url: '/notice/queryLatest',
    method: 'get'
  })
}

/**
 * 公告栏
 *
 * @export
 * @returns promise 为多条公告的新接口
 */
export function queryList() {
  return request({
    url: '/notice/queryList',
    method: 'get'
  })
}

/**
 * 获取用户支付方式
 *
 * @export
 * @returns promise
 */
export function getPaySetting() {
  return request({
    url: '/member/myPayments',
    method: 'get'
  })
}

/**
 * 修改用户支付方式
 *
 * @export
 * @param {number} payment 1:现金支付 2:apple pay 3:google pay 4:微信支付 5:支付宝支付 6:信用卡 7:月票
 * @returns
 */
export function setPayment(payment:number=1) {
  return request({
    url: '/member/setPayment',
    method: 'post',
    data: { payment }
  })
}

/**
 * 获取月票信息
 *
 * @export
 * @returns promise
 */
export function getMonthTicket() {
  return request({
    url: '/member/myMonthTicket',
    method: 'get'
  })
}

/**
 * 获取我的资料
 *
 * @export
 * @returns
 */
export function getMyInfo() {
  return request({
    url: '/member/me',
    method: 'get'
  });
}

/**
 * 更新我的资料
 *
 * @export
 * @param {string} nickName 昵称
 * @param {string} address 地址
 * @param {string} email 邮箱
 * @param {string} gender 性别
 * @returns
 */
export function updateMyInfo(nickName: string, address: string, email: string, gender: string) {
  return request({
    url: '/member/update',
    method: 'post',
    data: {
      nickName,
      address,
      email,
      gender
    }
  })
}

/**
 * 获取我的优惠券
 *
 * @export
 * @param {number} offset 偏移量
 * @param {number} limit 每页请求条数
 * @param {number} useStatus 使用状态
 * @returns
 */
export function myCoupon(offset: number, limit:number, useStatus: number,payMoney:number) {
  return request({
    url: '/coupon/myCoupon',
    method: 'post',
    data: {
      offset,
      limit,
      useStatus,
      payMoney
    }
  })
}

//点赞
export function myFavorite(foodId: number, status: number) {
  return request({
    url: '/food/like',
    method: 'post',
    data: {
      foodId,
      status
    }
  })
}

/**
 * 是否需要弹窗评论
 *
 * @export
 * @returns
 */
export function popupComment() {
  return request({
    url: '/comment/isPopup',
    method: 'post'
  })
}

/**
 * 菜品评论
 *
 * @export
 * @param {number} orderId 订单id
 * @param {number} star 评级
 * @param {string} comment 评论
 * @returns
 */
export function addComment(orderId: number, star: number, comment: string) {
  return request({
    url: '/comment/add',
    method: 'post',
    data: {
      orderId,
      star,
      comment
    }
  })
}

/**
 * 保存信用卡信息
 *
 * @export
 * @param {string} token stripe token
 * @param {string} time 有效期
 * @param {string} tailNum 尾号(4位)
 * @returns
 */
export function setCreditCard(token: string, time: string, tailNum: string) {
  return request({
    url: '/member/setCreditCard',
    method: 'post',
    data: {
      token, time, tailNum
    }
  })
}

/**
 * 获取信用卡信息
 *
 * @export
 * @returns
 */
export function getCreditCard() {
  return request({
    url: '/member/myCreditCard',
    method: 'get',
  })
}

/**
 * 我的邀请概要
 *
 * @export
 * @returns
 */
export function inviteActivityInfo() {
  return request({
    url: '/invite/showInvite',
    method: 'post',
  })
}

/**
 * 获取有层级关系的配送地址
 *
 * @export
 * @returns
 */
export function getDeliveryList(lat = null, lon = null) {
  return request({
    url: '/deliveryPlace/getList',
    method: 'post',
    data: {
      lat, lon
    }
  })
}

/**
 * 获取评论数
 *
 * @export
 * @param {*} {foodId = null, limit = 15, offset = 0}
 * @returns
 */
export function getCommentList({foodId = null, limit = 15, offset = 0}) {
  return request({
    url: '/comment/getCommentList',
    method: 'post',
    data: {
      foodId,
      limit,
      offset
    }
  })
}