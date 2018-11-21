import { observable, action, runInAction, decorate, configure } from 'mobx';
//api
import { foodPlaces, queryList } from '../api/request';
//api interface
import { IPlaceList, IQueryList } from '../interfaces/server';

// configure({enforceActions: "observed"})
class FoodListMobx {
  public placeList: IPlaceList[];
  public queryList: IQueryList[];
  public values = {
    currentPlace: {
      id: 1,
      name: '未选择'  
    },
    isDrawerShow: false,
    isPlaceMenuShow: false,
    isQueryListShow: true
  }

  public toggleDrawer():void {
    this.values.isDrawerShow = !this.values.isDrawerShow;
  }

  public togglePlaceMenu():void {
    this.values.isPlaceMenuShow = !this.values.isPlaceMenuShow;
  }

  public closeQueryList():void {
    this.values.isQueryListShow = false;
  }

  //api
  public async getFoodPlaces() {
    try{
      const {data} = await foodPlaces();
      runInAction(() => {
        this.placeList = data;
        this.values.currentPlace = data[0];
      })
    }catch(e) {
      console.log(e);
    }
  }

  public async getQueryList() {
    try {
      const {data} = await queryList();
      runInAction(() => {
        this.queryList = data;
        this.values.isQueryListShow = true;
      });
    }catch(e) {
      console.log(e);
    }
  }

  public changePlace(item: IPlaceList):void {
    this.values.currentPlace = item;
    this.togglePlaceMenu();
  }
}

decorate(FoodListMobx, {
  placeList: observable,
  queryList: observable,
  values: observable,
  toggleDrawer: action.bound,
  togglePlaceMenu: action.bound,
  closeQueryList: action.bound,
  getFoodPlaces: action.bound,
  getQueryList: action.bound,
  changePlace: action.bound
})

export default FoodListMobx;