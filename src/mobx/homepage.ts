import { observable, action, computed } from 'mobx';
//api
import { getDailyFoods, foodPlaces, queryList } from '../api/request';
//api interface
import { IPlaceList, IDailyFood } from '../interfaces/server'; 


export default class HomePageMobx {
  @observable public foodDetails: IDailyFood;
  @observable public placeList: IPlaceList[];
  @observable public values = {
    selectedTab: 'Daily',
    currentPlace: {
      id: 10,
      name: '未选择'
    },
    foodCount: 0,
    isDrawerShow: false,
    isPlaceMenuShow: false
  }

  @action.bound 
  public setTab(tab: string) {
    this.values.selectedTab = tab;
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
  public addOrRemove(count: number):void {
    this.values.foodCount = count;
  }

  @action.bound
  public changePlace(item: IPlaceList):void {
    this.values.currentPlace = item;
    this.togglePlaceMenu();
    this.getDailyFoods(item.id);
  }

  //api
  @action.bound
  public async getFoodPlaces() {
    try{
      const {data} = await foodPlaces();
      this.placeList = data;
      this.values.currentPlace = data[0];
      this.getDailyFoods(data[0].id);
    }catch(e) {
      console.log(e);
    }
  }

  @action.bound
  public async getDailyFoods(placeId: number) {
    try{
      const {data} = await getDailyFoods(placeId);
      this.foodDetails = data;
      // console.log(123, data);
    }catch(e) {
      console.log(e);
    }
  }
}