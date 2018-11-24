import { observable, action, computed } from 'mobx';

import { getDailyFoods, createOrder } from '../api/request';
import Basic from './basic'

import { Toast } from 'antd-mobile';

import { IDailyFood } from '../interfaces/server'; 

export default class ConfirmOrderMobx extends Basic{
    
@observable public dateFoodId: number = 0;

@observable public foodDetails: IDailyFood;

@action.bound
public async getDailyFoods(dateFoodId: number) {
  try{
    const {data} = await getDailyFoods(dateFoodId);
    this.foodDetails = data;
  }catch(e) {
    console.log(e);
  }
}

public async createOrder(dateFoodId: number, amount: number, callback: any) {
    try {
        const {data, ro}:any = await createOrder(dateFoodId, amount)
        if(ro.ok !== true) {
            Toast.info(ro.respMsg)
            if(ro.respCode === '10006') {
                callback()
            }
        } else {
            console.log(data);
        }
    } catch (error) {
        console.error(error)
    }
}

}