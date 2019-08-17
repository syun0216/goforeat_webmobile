import { observable, action, decorate, computed, runInAction } from "mobx";
//api
import { getDailyFoods, myFavorite } from "../api/request";
//api interface
import { IDailyFood } from "../interfaces/server";
//utils
import { errHandler, successHandler } from "../utils/requestHandler";

class FoodDetailsMobx {
  public foodDetails: IDailyFood;
  public values = {
    selectedTab: "Daily",
    foodCount: 1,
    favorCount: 0,
    isCommentViewShow: false,
    isFavorite: false
  };

  public setTab(tab: string) {
    this.values.selectedTab = tab;
  }

  public setCount(count: number) {
    this.values.foodCount = count;
  }

  public toggleCommentView() {
    console.log('123', 123)
    this.values.isCommentViewShow = !this.values.isCommentViewShow;
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
            this.values.favorCount = data.likeCount || 0;
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

  public async addFavorite(foodId: number, status: number) {
    try {

      this.values.isFavorite = !this.values.isFavorite;
      this.values.isFavorite ? (this.values.favorCount ++) : (this.values.favorCount--);
      const { data, ro }: any = await myFavorite(foodId, status);
    //   if (ro && ro.respCode && ro.respCode === "0000") {
    //     successHandler(() =>
    //       runInAction(() => {

    //       })
    //     );
    // } else {
    //   errHandler(ro)
    // }
    }catch(e) {
      errHandler(e);
    }
  }
}

decorate(FoodDetailsMobx, {
  foodDetails: observable,
  values: observable,
  setTab: action.bound,
  addOrRemove: action.bound,
  getDailyFoods: action.bound,
  setCount: action.bound,
  toggleCommentView: action.bound,
  addFavorite: action.bound
});

export default FoodDetailsMobx;
