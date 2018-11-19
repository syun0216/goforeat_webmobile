import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import LoginMobx from './login';
import EditInfoMobx from './editInfo'
import BasicMobx from './basic';

export {
  FoodDetailsMobx,
  FoodListMobx,
  LoginMobx,
  EditInfoMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  LoginMobx: new LoginMobx(),
  EditInfo: new EditInfoMobx()
}

export default rootStore;