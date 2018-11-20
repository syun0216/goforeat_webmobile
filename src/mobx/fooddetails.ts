import { observable, action, computed } from 'mobx';
//api
import { getDailyFoods } from '../api/request';
//api interface
import { IDailyFood } from '../interfaces/server'; 


export default class FoodDetailsMobx {
  @observable public foodDetails: IDailyFood;
  @observable public values = {
    selectedTab: 'Daily',
    foodCount: 1
  }

  @action.bound 
  public setTab(tab: string) {
    this.values.selectedTab = tab;
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

  @computed get sum() {
    return this.values.foodCount * this.foodDetails.price
  }

  

}