import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import LoginMobx from './login'
import BasicMobx from './basic';
import MyOrderMobx from './myorder';
import CommonListViewMobx from './commonListView';

export {
  FoodDetailsMobx,
  FoodListMobx,
  CommonListViewMobx,
  LoginMobx,
  MyOrderMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  commonListViewMobx: new CommonListViewMobx(),
  LoginMobx: new LoginMobx(),
  myOrderMobx: new MyOrderMobx()
}

export default rootStore;