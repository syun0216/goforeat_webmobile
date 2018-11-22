import { observable, action, computed } from 'mobx';

import { getDailyFoods } from '../api/request';
import Basic from './basic'

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

}