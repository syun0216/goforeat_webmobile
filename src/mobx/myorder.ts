import { observable, action, runInAction, decorate } from "mobx";
import { Toast } from "antd-mobile";
//utils
import { ORDER_STATUS } from "../utils/global_params";
//api
import { cancelOrder } from "../api/request";
//utils
import { errHandler, successHandler } from "../utils/requestHandler";

const {
  ORDER_DELIVERING,
  ORDER_FINISHED,
  ORDER_CANCEL,
  ORDER_ALL
} = ORDER_STATUS;

class MyOrderMobx {
  public currentOrderStatus: number = ORDER_DELIVERING;

  public setCurrentOrderStatus(status: number) {
    this.currentOrderStatus = status;
  }

  public async cancelOrder(orderId: number, callback?: () => void) {
    try {
      const { data, ro }: any = await cancelOrder(orderId);
      if (ro && ro.respCode && ro.respCode === "0000") {
        successHandler(() => {
          Toast.success("取消成功");
          callback&&callback();
        });
      }
    } catch (e) {
      errHandler(e);
    }
  }
}

decorate(MyOrderMobx, {
  currentOrderStatus: observable,
  setCurrentOrderStatus: action.bound,
  cancelOrder: action.bound
});

export default MyOrderMobx;
