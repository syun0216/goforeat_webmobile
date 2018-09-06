import request from './config';

/**
 * 获取验证码接口
 *
 * @export
 * @param {*} mobile 手机号码
 * @param {*} type 手机类型 HK: 1 CHN: 2
 * @returns
 */
export function getCode(mobile, type) {
  return request({
    url: '/passport/register',
    method: 'post',
    data: {
      mobile,
      type
    }
  })
}

//被弃用 请使用checkCode
export function register(mobile, type, token, code, password) {
  return request({
    url: '/passport/checkCode',
    method: 'post',
    data: {
      mobile,
      type,
      token,
      code,
      password
    }
  })
}

//被弃用 请使用checkCode
export function login(mobile, type, password) {
  return request({
    url: '/passport/login',
    method: 'post',
    data: {
      mobile,
      type,
      password
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
export function checkCode(mobile, type, token, code) { // 验证用户登录验证码
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
export function getArticleList(offset) { 
  return request({
    url: '/cms/getNewsList',
    method: 'post',
    data: {
      limit: 5,
      offset
    }
  })
}

/**
 * 获取首页菜品详情接口
 *
 * @export
 * @param {*} placeId 地区id
 * @returns promise
 */
export function getDailyFoods(placeId) {
  return request({
    url: '/food/getDailyFood',
    method: 'get',
    params: {
      placeId
    }
  })
}

/**
 * 创建订单接口，返回订单详情
 *
 * @export
 * @param {*} foodId 当日菜品id
 * @param {*} placeId 当前选择的地区id
 * @param {*} amount 选择菜品数量
 * @returns promise
 */
export function createOrder(foodId, placeId, amount) {
  return request({
    url: '/order/create',
    method: 'get',
    params: {
      foodId,
      placeId,
      amount
    }
  })
}

/**
 * 确认订单接口
 *
 * @export
 * @param {*} orderId 订单id
 * @param {*} coupon 优惠码
 * @param {*} payMoney 总金额（含优惠）
 * @param {number} [payment=1] 1:现金支付 2:apple pay 3:google pay 4:微信支付 5:支付宝支付 6:信用卡 7:月票
 * @param {*} token 信用卡支付 apple pay等需要的token,现金支付为空
 * @param {*} remark 用餐备注
 * @returns promise
 */
export function confirmOrder(orderId, coupon, payMoney, payment = 1, token, remark) {
  return request({
    url: '/order/confirm',
    method: 'post',
    data: {
      orderId,
      coupon,
      payMoney,
      payment,
      token,
      remark
    }
  })
}

/**
 * 使用优惠码接口
 *
 * @export
 * @param {*} coupon 优惠码
 * @param {*} orderId 订单id
 * @returns promise
 */
export function useCoupon(coupon,orderId) {
  return request({
    url: '/coupon/isUseful',
    method: 'post',
    data: {
      coupon,
      orderId
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
export function cancelOrder(orderId) {
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
export function myOrder(offset, status) {
  return request({
    url: '/order/myOrders',
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
export function foodPlaces() {
  return request({
    url: '/food/getDeliveryPlace',
    method: 'get'
  })
}

/** 
 * 保存极光推送 registrationId 到后台
 *
 * @export
 * @param {*} registrationId
 * @returns promise
 */
export function saveDevices(registrationId) {
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
export function vaildCard(bankCard) {
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
export function feedback(data) {
  return request({
    url: '/feedback/add',
    method: 'post',
    data: data
  })
}

/**
 * app首页广告位
 *
 * @export
 * @returns promise
 */
export function adSpace() {
  return request({
    url: '/adSpace/list',
    method: 'post',
    data: {
      pagePosition: 1
    }
  })
}

/**
 * 公告栏api
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
 * 公告栏api
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
export function setPayment(payment=1) {
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