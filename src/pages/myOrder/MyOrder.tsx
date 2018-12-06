import React, { Component } from "react";
import { Tabs, Modal, Flex } from "antd-mobile";
import { StickyContainer, Sticky } from "react-sticky";
import { inject, observer } from "mobx-react";
//interface
import { IMyOrder } from "../../interfaces";
import { IMyOrderItem } from "../../interfaces/server";
//component
import CommonHeader from "../../components/CommonHeader";
import CommonListView from "../../components/CommonListView";
import GenerateIcon from "../../components/GenerateIcon";
import Divider from "../../components/Divider";
//api
import { myOrder } from "../../api/request";
//utils
import {
  ORDER_STATUS,
  PAY_TYPE,
  EXPLAIN_ORDER_STATUS
} from "../../utils/global_params";
//styles
import "./MyOrder.less";

const {
  ORDER_DELIVERING,
  ORDER_FINISHED,
  ORDER_CANCEL,
  ORDER_ALL
} = ORDER_STATUS;
const alert = Modal.alert;

@inject("myOrderMobx")
@observer
export default class MyOrder extends Component<IMyOrder, {}> {
  private timer: any;
  private _commonlist: any;
  public componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.hideLoading();
      clearTimeout(this.timer);
    }, 1000);
  }

  public render() {
    return (
      <div className="myOrder-container">
        {this._renderHeader()}
        {this._renderCommonListView()}
      </div>
    );
  }

  private _renderHeader() {
    return (
      <CommonHeader canBack>
        <span>我的订单(待配送)</span>
      </CommonHeader>
    );
  }

  private _renderTabBar(props: any) {
    return (
      <Sticky>
        {({ style }) => (
          <div style={{ ...style, zIndex: 1 }}>
            <Tabs.DefaultTabBar {...props} />
          </div>
        )}
      </Sticky>
    );
  }

  private _renderTabView() {
    const tabs = [
      { title: "待配送", value: ORDER_DELIVERING },
      { title: "已完成", value: ORDER_FINISHED },
      { title: "已取消", value: ORDER_CANCEL },
      { title: "全部", value: ORDER_ALL }
    ];
    const { setCurrentOrderStatus } = this.props.myOrderMobx;
    return (
      <StickyContainer>
        <Tabs
          tabs={tabs}
          onTabClick={(tab, index) => {
            setCurrentOrderStatus(tab.value);
          }}
          animated={false}
          tabBarUnderlineStyle={{ borderColor: "#FF1A1A" }}
          tabBarActiveTextColor="#FF1A1A"
          renderTabBar={this._renderTabBar}
        >
          {this._renderCommonListView()}
        </Tabs>
      </StickyContainer>
    );
  }

  private _renderCommonListView() {
    const { currentOrderStatus } = this.props.myOrderMobx;
    return (
      <div style={{ backgroundColor: "#fff" }}>
        <CommonListView
          ref={cl => (this._commonlist = cl)}
          requestFunc={myOrder}
          renderItem={(rowData: any, sectionID: number, rowID: number) =>
            this._renderMyOrderItem(rowData, sectionID, rowID)
          }
          separatorColor="#F0EFF6"
          isItemSeparatorShow
          extraParams={{ status: currentOrderStatus }}
        />
      </div>
    );
  }

  private _renderMyOrderItem(
    rowData: IMyOrderItem,
    sectionID: number,
    rowID: number
  ) {
    const {
      orderId,
      orderName,
      takeTimeNew,
      picture,
      totalMoney,
      status,
      payment,
      amount,
      mealCode,
      takeAddress
    } = rowData;
    const { cancelOrder } = this.props.myOrderMobx;
    return (
      <div className="myorder-container" key={rowData.orderId}>
        <div className="desc">
          {GenerateIcon(picture, "foodPicture", "food-picture")}
          <ol className="food-content">
            <li className="food-item">
              <span className="orderName">{orderName}</span>
              <span>数量:{amount}</span>
            </li>
            <li className="food-item">
              <span className="commonFont">取餐時間</span>
              <span className="commonFont">{takeTimeNew}</span>
            </li>
            <li className="food-item">
              <span className="commonFont">取餐地點</span>
              <span className="commonFont">{takeAddress}</span>
            </li>
            <li className="food-item">
              <span className="commonFont">支付狀態</span>
              <span className="commonFont">{PAY_TYPE[payment]}</span>
            </li>
          </ol>
        </div>
        <Flex justify="between" style={{ marginBottom: "10px" }}>
          <span>取餐號:{mealCode}</span>
          <button
            onClick={() => {
              alert("提示", "是否取消訂單?", [
                { text: "否", onPress: () => console.log("cancel") },
                {
                  text: "是",
                  onPress: () => {
                    this.props.showRequesting();
                    cancelOrder(orderId, () => {
                      this._commonlist.wrappedInstance &&
                        this._commonlist.wrappedInstance.outsideRefresh &&
                        this._commonlist.wrappedInstance.outsideRefresh();
                    });
                  },
                  style: {
                    color: "#ff5858"
                  }
                }
              ]);
            }}
            className="cancel-btn"
          >
            取消訂單
          </button>
        </Flex>
        <Flex justify="between">
          <span>{EXPLAIN_ORDER_STATUS[status] || "全部"}</span>
          <span>總金額 HKD{totalMoney}</span>
        </Flex>
      </div>
    );
  }
}
