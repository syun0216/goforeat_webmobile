import { HomePageMobx } from '../mobx/rootStore';
import { FoodListMobx } from '../mobx/rootStore';


/**
 * 模块页面props接口 -----------------------------------------------------
 */

//homepage
export interface IHomePage {
  homePageMobx: HomePageMobx
}

export interface IFoodList {
  foodListMobx: FoodListMobx
}