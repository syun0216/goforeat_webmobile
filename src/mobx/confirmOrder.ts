import { observable, decorate, action, computed, runInAction } from "mobx";

import { confirmOrder, createOrder } from "../api/request";

import { Toast } from "antd-mobile";
import { INewOrder } from "../interfaces/server";

import { errHandler, successHandler } from '../utils/requestHandler';

export default class ConfirmOrderMobx {
  @observable public foodDetailValues = {
    foodCount: 1
  };

  @observable public remark: any;

  @observable public dateFoodId: number = 0;

  @observable public createdOrder: INewOrder;

  @action.bound
  public async createOrder(dateFoodId: number, amount: number) {
    const that = this;
    try {
      const { data, ro }: any = await createOrder(dateFoodId, amount);
      if (ro.ok !== true) {
        errHandler(ro);
      } else {
        successHandler(
          () => runInAction(() => {
            that.createdOrder = data;
          })
        );
      }
    } catch (error) {
      errHandler(error);
    }
  }
  @action.bound
  public async confirmOrder(callback: () => void) {
    const {orderId, totalMoney} = this.createdOrder
    const { data, ro }: any = await confirmOrder(orderId, totalMoney, 1, '', this.remark,null);
    if(ro.respCode === '0000') {
      successHandler(
        () => runInAction(() => {
          callback()
        })
      );
    } else {
      errHandler(ro);
    }
  }

  @action.bound
  public setRemark(remark: string) {
    this.remark = remark
  }

}
