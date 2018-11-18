import FoodDetailsMobx from './fooddetails';
import FoodListMobx from './foodlist';
import BasicMobx from './basic';
import CommonListViewMobx from './commonListView';

export {
  FoodDetailsMobx,
  FoodListMobx,
  CommonListViewMobx
}

const rootStore = {
  basicMobx: new BasicMobx(),
  foodDetailsMobx: new FoodDetailsMobx(),
  foodListMobx: new FoodListMobx(),
  CommonListViewMobx: new CommonListViewMobx()
}

export default rootStore;