import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import LoginMobx from './login';
import EditInfoMobx from './editInfo'
import ConfirmOrderMobx from './confirmOrder'
import BasicMobx from './basic';

export {
  FoodDetailsMobx,
  FoodListMobx,
  LoginMobx,
  EditInfoMobx,
  ConfirmOrderMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  LoginMobx: new LoginMobx(),
  EditInfoMobx: new EditInfoMobx(),
  ConfirmOrderMobx: new ConfirmOrderMobx()
}

export default rootStore;