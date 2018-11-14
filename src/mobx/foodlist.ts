import { observable, action, computed } from 'mobx';
//api
import { getFoodList, foodPlaces, queryList } from '../api/request';
//api interface
import { IFoodListItem, IPlaceList, IQueryList } from '../interfaces/server';
//antd
import { ListView } from 'antd-mobile';


export default class FoodListMobx {
  @observable public foodList = new ListView.DataSource({
    rowHasChanged: (row1:IFoodListItem, row2:IFoodListItem) => row1 !== row2
  });
  @observable public placeList: IPlaceList[];
  @observable public queryList: IQueryList[];
  @observable public values = {
    currentPlace: {
      id: 10,
      name: '未选择'
    },
    isDrawerShow: false,
    isPlaceMenuShow: false,
    isQueryListShow: true
  }

  @action.bound
  public toggleDrawer():void {
    console.log(this);
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
      this.getFoodList(0, data[0].id);
    }catch(e) {
      console.log(e);
      throw e;
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
    this.getFoodList(0, item.id);
  }

  @action.bound
  public async getFoodList(offset: number=0, placeId: number) {
    try {
      const {data} = await getFoodList(offset, placeId);
      this.foodList = this.foodList.cloneWithRows(data.list)
    } catch(e) {
      console.log(e);
      throw e;
    }
  }
}