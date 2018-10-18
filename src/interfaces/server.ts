export interface IPlaceList {
  id: number,
  name: string
}

export interface IDailyFood {
  endTimestamp: number,
  foodList: IDailyFoodItem[],
  status: number,
  subTitle: string,
  timestamp: string,
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
  time: string,
  pic: string,
  title: string,
  url: string
}