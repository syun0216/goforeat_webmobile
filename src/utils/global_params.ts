export const VERSION: string = '1.2.1';
export const webClient: number = 3;
export const BOTTOM_LOAD_STATUS = {
  LOADING: 0,
  LOAD_SUCCESS: 1,
  LOAD_FAILED: 2,
  NO_MORE_DATA: 3,
  NO_DATA: 4
};

export const ORDER_STATUS = {
  ORDER_CANCEL: -1,
  ORDER_DELIVERING: 1,
  ORDER_FINISHED: 2,
  ORDER_ALL: null
}

export const EXPLAIN_ORDER_STATUS = {
  [-1]: '已取消',
  1: '待配送',
  2: '已完成',
}

export const PAY_TYPE = {
  1: '現金支付',
  2: 'Apple Pay',
  3: 'Google Pay',
  4: 'WeChat Pay',
  5: 'Ali Pay',
  6: '信用卡',
  7: '月票'
}