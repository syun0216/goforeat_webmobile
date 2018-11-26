export interface IPlaceList {
  id: number,
  name: string
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
  status: number,
  subTitle: string,
  title: string
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
  star: number
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
  thumbnail: string,
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
  orderName: string
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
  totalMoney: number
}