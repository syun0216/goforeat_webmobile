import { FoodDetailsMobx } from '../mobx/rootStore';
import { FoodListMobx } from '../mobx/rootStore';


/**
 * 模块页面props接口 -----------------------------------------------------
 */

/**
 * foodlist 接口
 *
 * @export
 * @interface IFoodList
 */
export interface IFoodList {
  foodListMobx: FoodListMobx
}

/**
 * fooddetails 接口
 *
 * @export
 * @interface IFoodDetails
 */
export interface IFoodDetails {
  foodDetailsMobx: FoodDetailsMobx
}