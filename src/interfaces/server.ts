import { string } from "prop-types";

export interface IPlaceList {
  id: number,
  name: string,
  lon: number,
  lat: number,
  length: number,
  picture: string
}

export interface IDailyFood {
  canteenAddress: string | null,
  canteenName: string,
  dateFoodId: number,
  extralImage: string[],
  foodBrief: string,
  foodId: number,
  foodName: string,
  like: number,
  likeCount: number,
  price: number,
  originPrice: number,
  status: number,
  subTitle: string,
  title: string,
  commentAmount: number | string
}

export interface IDailyFoodItem {
  canteenAddress: null | string,
  canteenName: null | string,
  extralImage: string[],
  foodBrief: string,
  foodId: number,
  foodImage: string,
  foodName: string,
  originPrice: null | number,
  price: number,
  star: number,
  like: number,
  likeCount: number,
  addName: string,
  addCount: string
}

export interface IQueryList {
  title: string,
  url: string
}

export interface IFoodListItem {
  brief: string,
  canteenAddress: string,
  date: string,
  dateFoodId: number,
  foodId: number,
  name: string,
  price: string,
  originPrice: string,
  thumbnail: string,
  canteenName: string
}

export interface IUser {
  id: number,
  account: string,
  email: string,
  nick_name: string,
  profile_img: string,
  gender: string,
}

export interface ILoginInfo {
  phoneNumer: number,
  validateCode: number
}

export interface IMyOrderItem {
  takeTimeNew: string,
  amount: number,
  orderId:number,
  takeTime: string,
  totalMoney: number,
  picture:string,
  orderTime: string,
  takeAddressDetail:string,
  payment:number,
  takeAddress:string,
  takeDate: string,
  status: number,
  orderName: string,
  mealCode: string
}

export interface INewOrder {
  defaultPayment: number,
  foodMoney: number,
  foodName: string,
  foodNum: number,
  orderId: number,
  takeAddress: string,
  takeDate: string,
  takeTime: string,
  totalMoney: number,
  orderName: string
}

//广告位
export interface IAdSpace {
  image: string,
  title: string,
  url: string
}

export interface ICommentList {
  totalAmount: string,
  totalStart: string,
  list: ICommentListItem[]
}

export interface ICommentListItem {
  star: number,
  nickName: string,
  comment: string,
  profileImg: string
}

export interface ICouponItem {
  condition: string, 
  discount: number | string,
  endTime: string, 
  deductionId:number | string, 
  type: number | string, 
  useStatus: number | string
}