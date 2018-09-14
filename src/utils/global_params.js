export const VERSION = '1.2.1';


//支付方式
export const PAY_TYPE = {
  cash: 1,
  apple_pay: 2,
  android_pay: 3,
  credit_card: 6,
  month_ticket: 7
};

export const EXPLAIN_PAY_TYPE = {
  1: {zh:'現金支付',en: 'Cash Pay'},
  2: {zh:'Apple Pay',en: 'Apple Pay'},
  3: {zh:'Google Pay', en: 'Google Pay'},
  4: {zh: '微信支付',en: 'WeChat Pay'},
  5: {zh: '支付寶支付', en: 'Ali Pay'},
  6: {zh:'信用卡支付',en: 'Credit Card'},
  7: {zh: '月票支付',en: 'Month Tikcet'}
}

export const BOTTOM_LOAD_STATUS = {
  LOADING: 0,
  LOAD_FAILED: 1,
  LOAD_HAS_MORE: 2,
  NO_MORE_DATA: 3
};