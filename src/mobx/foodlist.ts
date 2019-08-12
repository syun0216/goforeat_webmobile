import React from 'react';
import { observable, action, runInAction, decorate, observe, autorun, reaction } from "mobx";
import { isNil } from 'lodash';
//api
import { foodPlaces, queryList, adSpace } from "../api/request";
//api interface
import { IPlaceList, IQueryList, IAdSpace } from "../interfaces/server";
//utils
import { errHandler, successHandler } from "../utils/requestHandler";

// configure({enforceActions: "observed"})
let rawPlaceList: IPlaceList[] = [];
let _searchTimer: any = null;
class FoodListMobx {
  public placeList: IPlaceList[];
  public queryList: IQueryList[];
  public adList: IAdSpace[];
  public values = {
    currentPlace: {
      id: 1,
      name: "未选择",
      lat: 22.3646267388,
      lon: 114.1948886251
    },
    currentStar: 5,
    isDrawerShow: false,
    isPlaceMenuShow: false,
    isQueryListShow: true,
    isFixedMenuListShow: false
  };

  public toggleDrawer(): void {
    this.values.isDrawerShow = !this.values.isDrawerShow;
  }

  public togglePlaceMenu(): void {
    this.values.isPlaceMenuShow = !this.values.isPlaceMenuShow;
  }

  public closeQueryList(): void {
    this.values.isQueryListShow = false;
  }

  public toggleFixedMenu(): void {
    this.values.isFixedMenuListShow = !this.values.isFixedMenuListShow;
  }

  public setStar(star: number): void {
    this.values.currentStar = star;
  }

  public searchForAddress(e: React.ChangeEvent<HTMLInputElement>): void {
    const value = e.target.value;
    if(_searchTimer) {
      clearTimeout(_searchTimer);
    }
    _searchTimer = setTimeout(() => {
      if(value === "" || isNil(value)) {
        this.placeList = rawPlaceList.slice(0);
        return;
      } 
      this.placeList = rawPlaceList.filter(v => v.name.indexOf(value) > -1);
      clearTimeout(_searchTimer);
    }, 300);
  }

  //api
  public async getFoodPlaces(lat: any, lon: any) {
    try {
      const { data, ro }: any = await foodPlaces(lat, lon);
      if (ro && ro.respCode && ro.respCode === "0000") {
        successHandler(() =>
          runInAction(() => {
            this.placeList = data;
            rawPlaceList = data;
            sessionStorage.setItem('placeList', JSON.stringify(data));
            const foodPlace: any = sessionStorage.getItem('foodPlace');
            sessionStorage.getItem('foodPlace') ? this.values.currentPlace =  JSON.parse(foodPlace): 
            this.values.currentPlace = data[0]; 
          })
        );
      } else {
        errHandler(ro);
      }
    } catch (e) {
      errHandler(e);
      console.log(e);
    }
  }

  public async getQueryList() {
    try {
      const { data, ro }: any = await queryList();
      if (ro && ro.respCode && ro.respCode === "0000") {
        successHandler(() =>
          runInAction(() => {
            this.queryList = data;
            this.values.isQueryListShow = true;
          })
        );
      } else {
        errHandler(ro);
      }
    } catch (e) {
      errHandler(e);
      console.log(e);
    }
  }

  public async getAdSpace(type: number) {
    try {
      const {data, ro}: any = await adSpace(type);
      if(ro && ro.respCode && ro.respCode === "0000") {
        successHandler(() => {
          runInAction(() => {
            this.adList = data;
          })
        })
      }else{
        errHandler(ro)
      }
    }catch(e) {
      errHandler(e)
    }
  }

  public changePlace(item: IPlaceList, callback?:() => void): void {
    this.values.currentPlace = item;
      this.placeList.forEach((v, i) => {
        if(this.placeList[i].id === item.id) {
          this.placeList.splice(i, 1);
        }
      })
      // if(this.placeList[+i].id === item.id) {
      //   this.placeList.splice(+i, 1);
      // }
    this.placeList.unshift(item);
    sessionStorage.setItem('foodPlace', JSON.stringify(item));
    this.togglePlaceMenu();
    // reaction(() => this.values.currentPlace, arr => {
    //   console.log(arr.id);
    // });
    autorun(() => {
      callback&&callback();
    })
  }
}

decorate(FoodListMobx, {
  placeList: observable,
  queryList: observable,
  values: observable,
  toggleDrawer: action.bound,
  togglePlaceMenu: action.bound,
  toggleFixedMenu: action.bound,
  closeQueryList: action.bound,
  setStar: action.bound,
  searchForAddress: action.bound,
  getFoodPlaces: action.bound,
  getAdSpace: action.bound,
  getQueryList: action.bound,
  changePlace: action.bound
});

export default FoodListMobx;
