import React from "react";
import { Drawer, List, ListView, NoticeBar } from "antd-mobile";
import { Link } from "react-router-dom";
//style
import "./FoodList.less";
//interface
import { IFoodList } from "../../interfaces";
import { IFoodListItem } from "../../interfaces/server";
//mobx
import { observer, inject } from "mobx-react";
//components
import CommonHeader from "../../components/CommonHeader";
import GenerateIcon from "../../components/GenerateIcon";
import Divider from "../../components/Divider";
//utils
import { isEmpty } from "../../utils/common";
//header
const menuIcon = require("@/assets/menu.png");
const checkedIcon = require("@/assets/checked.png");
const uncheckedIcon = require("@/assets/unchecked.png");
//sidebar
const order = require("@/assets/order.png");
const paytype = require("@/assets/payment.png");
const setting = require("@/assets/setting.png");
const topLogo = require("@/assets/logoTop.png");

const COMPONENT_HEIGHT: number = document.documentElement.clientHeight;

@inject("foodListMobx")
@observer
export default class FoodList extends React.Component<IFoodList, {}> {
  private offset: number = 0;
  private _listView: any;
  constructor(props: IFoodList) {
    super(props);
  }

  public async componentDidMount() {
    const { getFoodPlaces, getQueryList } = this.props.foodListMobx;
    await getFoodPlaces();
    await getQueryList();
    this.props.hideLoading();
  }

  public render() {
    const {
      values: { isDrawerShow, isPlaceMenuShow, isQueryListShow },
      toggleDrawer
    } = this.props.foodListMobx;
    return (
      <div className="food-list-container">
        {/* <Drawer
          className="my-drawer"
          style={{ minHeight: COMPONENT_HEIGHT }}
          enableDragHandle
          contentStyle={{ color: "#A6A6A6", textAlign: "center" }}
          sidebarStyle={{ width: "75%" }}
          sidebar={this._renderSidebarView()}
          open={isDrawerShow}
          onOpenChange={toggleDrawer}
          touch={false}
        >
        </Drawer> */}
        {this._renderHeader()}
        {isQueryListShow ? this._renderQueryListView() : null}
        {isPlaceMenuShow ? this._renderMenuView() : null}
        {this._renderFoodListView()}
      </div>
    );
  }

  private _renderHeader() {
    const {
      toggleDrawer,
      togglePlaceMenu,
      values: { currentPlace, isPlaceMenuShow }
    } = this.props.foodListMobx;
    return (
      <CommonHeader
        leftContent={<img className="menu-icon" src={menuIcon} alt="menu" />}
        onLeftClick={toggleDrawer}
      >
        <span onClick={togglePlaceMenu}>{currentPlace.name}</span>
        {isPlaceMenuShow ? (
          <i className="fas fa-angle-up icon-arrow" />
        ) : (
          <i className="fas fa-angle-down icon-arrow" />
        )}
        <div className="placeInputBg" />
      </CommonHeader>
    );
  }

  private _renderMenuView() {
    const {
      placeList,
      changePlace,
      values: { currentPlace }
    } = this.props.foodListMobx;
    if (placeList.length === 0) {
      return null;
    }
    return (
      <ul className="dropdown-menu">
        {placeList.map((v, i) => (
          <li className="dropdown-item" key={i} onClick={() => changePlace(v)}>
            {v.name}
            {v.name === currentPlace.name
              ? GenerateIcon(checkedIcon, "check", "check-icon")
              : GenerateIcon(uncheckedIcon, "uncheck", "uncheck-icon")}
          </li>
        ))}
      </ul>
    );
  }

  private _renderSidebarView() {
    const _drawerList = [
      {
        name: "我的訂單",
        icon: GenerateIcon(order, "order", "sidebar-icon"),
        path: "/myorder"
      },
      {
        name: "支付方式",
        icon: GenerateIcon(paytype, "paytype", "sidebar-icon"),
        path: "/myorder"
      },
      {
        name: "系統設置",
        icon: GenerateIcon(setting, "setting", "sidebar-icon"),
        path: "/myorder"
      }
    ];
    return (
      <div>
        <div className="sidebar-top">
          {GenerateIcon(topLogo, "topLogo", "sidebar-top-img")}
        </div>
        {_drawerList.map((item, key) => (
          <List.Item key={key} multipleLine thumb={item.icon}>
            {item.name}
          </List.Item>
        ))}
      </div>
    );
  }

  private _renderQueryListView() {
    const { queryList } = this.props.foodListMobx;
    if (isEmpty(queryList)) {
      return null;
    }
    return (
      <NoticeBar
        marqueeProps={{
          loop: true,
          style: { padding: "0 7.5px" },
          text: queryList[0].title
        }}
        // mode="closable"
        icon={<i className="fas fa-bell" />}
        onClick={() => this.props.history.push('/content', {data: queryList[0]})}
      >
        {queryList[0].title}
      </NoticeBar>
    );
  }

  private _renderFoodListItem(
    rowData: IFoodListItem,
    sectionID: number,
    rowID: number
  ) {
    const { thumbnail, name, brief, price, date, dateFoodId } = rowData;
    const _brief = brief.split("").join(" ");
    return (
      <Link to={`/foodDetails/${dateFoodId}`}>
        <div className="food-list-item">
          {GenerateIcon(thumbnail, "thumbnail", "item-thumbnail")}
          <div className="item-details">
            <div className="item-container">
              <span className="item-foodname">{name}</span>
              <span className="item-date">{date}</span>
            </div>
            <p className="item-brief">{_brief}</p>
            <div className="item-container">
              <span className="item-price">HKD {price}</span>
              <span className="item-btn">立即預訂</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  private _renderFoodListView() {
    const { foodList } = this.props.foodListMobx;
    return (
      <ListView
        ref={el => (this._listView = el)}
        className="food-list-view"
        dataSource={foodList}
        pageSize={5}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        renderHeader={() => (<span>精选菜单</span> )}
        renderRow={this._renderFoodListItem}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          Loading...
        </div>)}
        onEndReachedThreshold={10}
        onEndReached={() => console.log(123)}
        renderSeparator={(sectionID, rowID) => (
          <Divider key={rowID} bgColor="transparent" height="10px" />
        )}
      />
    );
  }
}
