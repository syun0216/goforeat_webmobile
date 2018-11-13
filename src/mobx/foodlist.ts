import { observable, action, computed } from 'mobx';
//api
import { getFoodList, foodPlaces } from '../api/request';
//api interface
import { IFoodListItem, IPlaceList } from '../interfaces/server';
//antd
import { ListView } from 'antd-mobile';

export default class FoodListMobx {
  @observable public foodList = new ListView.DataSource({
    rowHasChanged: (row1:IFoodListItem, row2:IFoodListItem) => row1 !== row2
  });
  @observable public placeList: IPlaceList[];
  @observable public values = {
    currentPlace: {
      id: 10,
      name: '未选择'
    },
    isDrawerShow: false,
    isPlaceMenuShow: false,
  }

  @action.bound
  public toggleDrawer():void {
    this.values.isDrawerShow = !this.values.isDrawerShow;
  }

  @action.bound
  public togglePlaceMenu():void {
    this.values.isPlaceMenuShow = !this.values.isPlaceMenuShow;
  }

  //api
  @action.bound
  public async getFoodPlaces() {
    try{
      const {data} = await foodPlaces();
      this.placeList = data;
      this.values.currentPlace = data[0];
      this.getFoodList(0, data[0].id);
    }catch(e) {
      console.log(e);
    }
  }

  @action.bound
  public changePlace(item: IPlaceList):void {
    this.values.currentPlace = item;
    this.togglePlaceMenu();
    this.getFoodList(0, item.id);
  }

  @action.bound
  public async getFoodList(offset: number=0, placeId: number) {
    try {
      const {data} = await getFoodList(offset, placeId);
      console.log(data);
      this.foodList = this.foodList.cloneWithRows(data.list)
    } catch(e) {
      console.log(e);
    }
  }
}