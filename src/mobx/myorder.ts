import {observable, action, runInAction, decorate} from 'mobx';
//utils
import { ORDER_STATUS } from '../utils/global_params';

const { ORDER_DELIVERING, ORDER_FINISHED, ORDER_CANCEL, ORDER_ALL } = ORDER_STATUS;

class MyOrderMobx {
  public currentOrderStatus: number = ORDER_DELIVERING;

  public setCurrentOrderStatus(status:number) {
    this.currentOrderStatus = status;
  }
}

decorate(MyOrderMobx, {
  currentOrderStatus: observable,
  setCurrentOrderStatus: action.bound
});

export default MyOrderMobx;