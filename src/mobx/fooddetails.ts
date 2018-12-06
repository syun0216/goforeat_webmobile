import { observable, action, decorate, computed, runInAction } from "mobx";
//api
import { getDailyFoods } from "../api/request";
//api interface
import { IDailyFood } from "../interfaces/server";
//utils
import { errHandler, successHandler } from "../utils/requestHandler";

class FoodDetailsMobx {
  public foodDetails: IDailyFood;
  public values = {
    selectedTab: "Daily",
    foodCount: 1
  };

  public setTab(tab: string) {
    this.values.selectedTab = tab;
  }

  public setCount(count: number) {
    this.values.foodCount = count;
  }

  public addOrRemove(status: string): void {
    if (status === "add") {
      this.values.foodCount++;
    } else {
      if (this.values.foodCount === 1) {
        return;
      }
      this.values.foodCount--;
    }
  }

  public async getDailyFoods(dateFoodId: number) {
    try {
      const { data, ro }: any = await getDailyFoods(dateFoodId);
      if (ro && ro.respCode && ro.respCode === "0000") {
        successHandler(() =>
          runInAction(() => {
            this.foodDetails = data;
          })
        );
      } else {
        errHandler(ro);
      }
    } catch (e) {
      errHandler(e);
      // console.log(e);
    }
  }
}

decorate(FoodDetailsMobx, {
  foodDetails: observable,
  values: observable,
  setTab: action.bound,
  addOrRemove: action.bound,
  getDailyFoods: action.bound,
  setCount: action.bound
});

export default FoodDetailsMobx;
