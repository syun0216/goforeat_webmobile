import { observable, action, decorate } from 'mobx';
//api
import { getDailyFoods } from '../api/request';
//api interface
import { IDailyFood } from '../interfaces/server'; 


class FoodDetailsMobx {
  public foodDetails: IDailyFood;
  public values = {
    selectedTab: 'Daily',
    foodCount: 1
  }
 
  public setTab(tab: string) {
    this.values.selectedTab = tab;
  }

  public addOrRemove(status: string):void {
    if(status === 'add') {
      this.values.foodCount ++ ;
    } else {
      if(this.values.foodCount === 1) {
        return;
      }
      this.values.foodCount --;
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
}

decorate(FoodDetailsMobx, {
  foodDetails: observable,
  values: observable,
  setTab: action.bound,
  addOrRemove: action.bound,
  getDailyFoods: action.bound 
});

export default FoodDetailsMobx;