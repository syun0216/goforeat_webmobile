import { observable, action, decorate, computed } from 'mobx';
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

  public addOrRemove(status: string):void {
    if(status === 'add') {
      this.foodDetailValues.foodCount ++ ;
    } else {
      if(this.foodDetailValues.foodCount === 1) {
        return;
      }
      this.foodDetailValues.foodCount --;
    }
  }

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

  
// decorate(FoodDetailsMobx, {
//   foodDetails: observable,
//   values: observable,
//   setTab: action.bound,
//   addOrRemove: action.bound,
//   getDailyFoods: action.bound 
// });
}