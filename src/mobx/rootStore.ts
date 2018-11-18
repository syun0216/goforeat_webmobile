import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import LoginMobx from './login'
import BasicMobx from './basic';

export {
  FoodDetailsMobx,
  FoodListMobx,
  LoginMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  LoginMobx: new LoginMobx()
}

export default rootStore;