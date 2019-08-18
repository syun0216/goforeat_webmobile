import React, { Component } from "react";
//api
import { myCoupon } from "../../api/request";
//interface
import { ICouponItem } from "../../interfaces/server";
//components
import CommonHeader from "../../components/CommonHeader";
import CommonListView from "../../components/CommonListView";

const couponStatus = {
  effective: 1,
  used: 3,
  expired: 4
}

export default class Coupon extends Component {
  private couponList: any;

  public render() {
    return <div className="coupon-container">{this._renderHeader()}</div>;
  }

  private _renderHeader() {
    return (
      <CommonHeader canBack>
        <span className="title">優惠券</span>
      </CommonHeader>
    );
  }

  private _renderCouponList() {
    return (
      <CommonListView
        ref={cl => (this.couponList = cl)}
        requestFunc={myCoupon}
        extraParams={{ payMoney: null }}
        renderItem={this._renderCouponItem}
      />
    );
  }

  private _renderCouponItem(rowData: ICouponItem, sectionID: number, rowID: number) {
    const { condition, discount, endTime, type, useStatus } = rowData;
    return (
      <div key={rowID}>
        <span>{endTime}</span>
      </div>
    )
  }
}
