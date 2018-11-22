import { observable, action, computed } from 'mobx';
//api
import { getDailyFoods } from '../api/request';
//api interface
import { IDailyFood } from '../interfaces/server'; 

import Basic from './basic'


export default class FoodDetailsMobx extends Basic{
  @observable public foodDetails: IDailyFood;

  @action.bound 
  public setTab(tab: string) {
    this.foodDetailValues.selectedTab = tab;
  }

  @action.bound
  public addOrRemove(count: number):void {
    this.foodDetailValues.foodCount = count;
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
    return this.foodDetailValues.foodCount * this.foodDetails.price
  }

  

}