import { FoodDetailsMobx } from '../mobx/rootStore';
import { FoodListMobx } from '../mobx/rootStore';
import { LoginMobx }  from '../mobx/rootStore'


/**
 * 模块页面props接口 -----------------------------------------------------
 */

/**
 * 基础接口
 *
 * @interface IBasic
 */
interface IBasic {
  hideLoading: () => {};
  showRequesting: () => {};
  hideRequesting: () => {};
  history: any,
  location: any,
  match: any
}

/**
 * foodlist 接口
 *
 * @export
 * @interface IFoodList
 */
export interface IFoodList extends IBasic {
  foodListMobx: FoodListMobx;
}

/**
 * fooddetails 接口
 *
 * @export
 * @interface IFoodDetails
 */
export interface IFoodDetails extends IBasic {
  foodDetailsMobx: FoodDetailsMobx
}

/**
 * login 接口
 *
 * @export
 * @interface ILogin
 */
export interface ILogin {
  LoginMobx: LoginMobx
}
