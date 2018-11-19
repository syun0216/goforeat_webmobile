import { observable, action } from 'mobx';
//api
import { getFoodList, foodPlaces, queryList } from '../api/request';
//api interface
import { IFoodListItem, IPlaceList, IQueryList } from '../interfaces/server';
//antd
import { ListView } from 'antd-mobile';


export default class FoodListMobx {
  @observable public placeList: IPlaceList[];
  @observable public queryList: IQueryList[];
  @observable public values = {
    currentPlace: {
      id: 1,
      name: '未选择'
    },
    isDrawerShow: false,
    isPlaceMenuShow: false,
    isQueryListShow: true
  }

  @action.bound
  public toggleDrawer():void {
    this.values.isDrawerShow = !this.values.isDrawerShow;
  }

  @action.bound
  public togglePlaceMenu():void {
    this.values.isPlaceMenuShow = !this.values.isPlaceMenuShow;
  }

  @action.bound
  public closeQueryList():void {
    this.values.isQueryListShow = false;
  }

  //api
  @action.bound
  public async getFoodPlaces() {
    try{
      const {data} = await foodPlaces();
      this.placeList = data;
      this.values.currentPlace = data[0];
    }catch(e) {
      console.log(e);
    }
  }

  @action.bound
  public async getQueryList() {
    try {
      const {data} = await queryList();
      this.queryList = data;
      this.values.isQueryListShow = true;
    }catch(e) {
      console.log(e);
    }
  }

  @action.bound
  public changePlace(item: IPlaceList):void {
    this.values.currentPlace = item;
    this.togglePlaceMenu();
  }
}