import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import LoginMobx from './login';
import EditInfoMobx from './editInfo'
import ConfirmOrderMobx from './confirmOrder'
import BasicMobx from './basic';
import MyOrderMobx from './myorder';
import CommonListViewMobx from './commonListView';

export {
  FoodDetailsMobx,
  FoodListMobx,
  LoginMobx,
  EditInfoMobx,
  ConfirmOrderMobx,
  CommonListViewMobx,
  MyOrderMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  LoginMobx: new LoginMobx(),
  EditInfoMobx: new EditInfoMobx(),
  ConfirmOrderMobx: new ConfirmOrderMobx(),
  commonListViewMobx: new CommonListViewMobx(),
  myOrderMobx: new MyOrderMobx()
}

export default rootStore;