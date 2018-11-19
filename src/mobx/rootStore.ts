import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import LoginMobx from './login'
import BasicMobx from './basic';
import CommonListViewMobx from './commonListView';

export {
  FoodDetailsMobx,
  FoodListMobx,
  CommonListViewMobx,
  LoginMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  CommonListViewMobx: new CommonListViewMobx(),
  LoginMobx: new LoginMobx()
}

export default rootStore;