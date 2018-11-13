import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import BasicMobx from './basic';

export {
  FoodDetailsMobx,
  FoodListMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx()
}

export default rootStore;