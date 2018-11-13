import { observable, action, computed } from 'mobx';
//api
import { getDailyFoods, queryList } from '../api/request';
//api interface
import { IDailyFood, IQueryList } from '../interfaces/server'; 


export default class FoodDetailsMobx {
  @observable public foodDetails: IDailyFood;
  
  @observable public queryList: IQueryList[];
  @observable public values = {
    selectedTab: 'Daily',
    foodCount: 1,
    isQueryListShow: false
  }

  @action.bound 
  public setTab(tab: string) {
    this.values.selectedTab = tab;
  }

  @action.bound
  public closeQueryList():void {
    this.values.isQueryListShow = false;
  }

  @action.bound
  public addOrRemove(count: number):void {
    this.values.foodCount = count;
  }

  @action.bound
  public async getDailyFoods(dateFoodId: number) {
    try{
      const {data} = await getDailyFoods(dateFoodId);
      this.foodDetails = data;
      console.log(123, data);
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

}