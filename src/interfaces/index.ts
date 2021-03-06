import { FoodDetailsMobx, FoodListMobx, LoginMobx, EditInfoMobx, ConfirmOrderMobx, CommonListViewMobx, MyOrderMobx,BasicMobx } from '../mobx/rootStore';

/**
 * 模块页面props接口 -----------------------------------------------------
 */

/**
 * 基础接口
 *
 * @interface IBasic
 */
export interface IBasic {
  basicMobx: BasicMobx,
  showLoading: () => void,
  hideLoading: () => void,
  showRequesting: () => void,
  hideRequesting: () => void,
  showToast: (val1:string, val2:string) => void,
  toggleModal: (val?:boolean, callback?:() => void) => void,
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
export interface ILogin extends IBasic {
  LoginMobx: LoginMobx
}

export interface IEditInfo extends IBasic {
  EditInfoMobx: EditInfoMobx
}

export interface IConfirmOrder extends IBasic {
  ConfirmOrderMobx: ConfirmOrderMobx
}

export interface IMyOrder extends IBasic {
  myOrderMobx: MyOrderMobx
}

export interface ICommonListView {
  commonListViewMobx?: CommonListViewMobx
}
