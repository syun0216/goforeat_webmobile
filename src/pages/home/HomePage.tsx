import React from "react";
import {
  Menu,
  ActivityIndicator,
  List,
  WhiteSpace,
  Stepper,
  TabBar,
  WingBlank,
  NoticeBar,
  Drawer
} from "antd-mobile";
//style
import "./HomePage.less";
//mobx
import { observer, inject } from "mobx-react";
//interface
import { IHomePage } from "../../interfaces";
import { IDailyFood } from "../../interfaces/server";
//components
import CommonHeader from "../../components/CommonHeader";
//utils
import { isEmpty, endDate } from '../../utils/common';

//tabbar
const homePageInActiveIcon = require("@/assets/Shape_inactive.png");
const homePageActiveIcon = require("@/assets/Shape.png");
const foodListPageInActiveIcon = require("@/assets/date.png");
const foodListPageActiveIcon = require("@/assets/date_active.png");

//header
const menuIcon = require("@/assets/menu.png");
const checkedIcon = require("@/assets/checked.png");
const uncheckedIcon = require("@/assets/unchecked.png");

//sidebar
const order = require("@/assets/order.png");
const paytype = require("@/assets/payment.png");
const setting = require("@/assets/setting.png");
const topLogo = require("@/assets/logoTop.png");

const COMPONENT_HEIGHT: number = document.documentElement.clientHeight - 45;

const HAS_FOODS: number = 1;
const NO_MORE_FOODS: number = 2;
const IS_INTERCEPT: number = 3;

@inject("homePageMobx")
@observer
export default class HomePage extends React.Component<IHomePage, {}> {
  constructor(props: IHomePage) {
    super(props);
  }

  public async componentDidMount() {
    const { getFoodPlaces } = this.props.homePageMobx;
    await getFoodPlaces();
  }

  public render() {
    const {
      values: { selectedTab, isDrawerShow, isPlaceMenuShow },
      setTab,
      toggleDrawer
    } = this.props.homePageMobx;
    return (
      <div className="homepage-container">
        <TabBar
          className="tabbar-container"
          unselectedTintColor="#333"
          tintColor="#d93a49"
          barTintColor="white"
        >
          <TabBar.Item
            title="每日菜品"
            key="Daily"
            icon={this._generateIcon(homePageInActiveIcon, "homeInActive")}
            selectedIcon={this._generateIcon(
              homePageActiveIcon,
              "homeActive"
            )}
            selected={selectedTab === "Daily"}
            onPress={() => setTab("Daily")}
          >
            <Drawer
              className="my-drawer"
              style={{ minHeight: COMPONENT_HEIGHT}}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
              sidebarStyle={{ minWidth: '75%' }}
              sidebar={this._renderSidebarView()}
              open={isDrawerShow}
              onOpenChange={toggleDrawer}
              touch={false}
            >
              {this._renderHeader()}
              { isPlaceMenuShow ? this._renderMenuView() : null }
              { this._renderContentView() }
            </Drawer>
          </TabBar.Item>
          <TabBar.Item
            title="本週菜單"
            key="Weekly"
            icon={this._generateIcon(
              foodListPageInActiveIcon,
              "foodInActive"
            )}
            selectedIcon={this._generateIcon(
              foodListPageActiveIcon,
              "foodActive"
            )}
            selected={selectedTab === "Weekly"}
            onPress={() => setTab("Weekly")}
          >
            123
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }

  private _renderHeader() {
    const { toggleDrawer, togglePlaceMenu, values: {currentPlace, isPlaceMenuShow} } = this.props.homePageMobx;
    return (
      <CommonHeader
        leftContent={<img className="menu-icon" src={menuIcon} alt="menu" />}
        onLeftClick={toggleDrawer}
      >
        <span onClick={togglePlaceMenu}>{currentPlace.name}</span>
        {
          isPlaceMenuShow ? <i className="fas fa-angle-up icon-arrow" />
           : <i className="fas fa-angle-down icon-arrow" />
        }
      </CommonHeader>
    );
  }

  private _generateIcon(icon: any, imgName: string, imgClassName: string = 'tab-icon') {
    return <img className={imgClassName} src={icon} alt={imgName} />;
  }

  private _renderSidebarView() {
    const _drawerList = [
      {name: '我的訂單', icon:this._generateIcon(order, 'order', 'sidebar-icon'), path: '/myorder'}, 
      {name: '支付方式',icon:this._generateIcon(paytype, 'paytype', 'sidebar-icon'), path: '/myorder'},
      {name: '系統設置',icon: this._generateIcon(setting, 'setting', 'sidebar-icon'), path: '/myorder'}
    ];
    return (
      <div>
        <div className="sidebar-top">
          {this._generateIcon(topLogo, 'topLogo', 'sidebar-top-img')}
        </div>
        {_drawerList.map((item, key) => (
          <List.Item key={key} multipleLine thumb={item.icon}>{item.name}</List.Item>
        ))}
      </div>
    )
  }

  private _renderMenuView() {
    const { placeList, changePlace, values: {currentPlace} } = this.props.homePageMobx;
    console.log({placeList,length:placeList.length});
    if(placeList.length === 0) {return null};
    return (
      <ul className="dropdown-menu">
        {placeList.map((v, i) => (
          <li className="dropdown-item" key={i} onClick={() => changePlace(v)}>
            {v.name}
            { v.name === currentPlace.name ? this._generateIcon(checkedIcon, 'check', 'check-icon') :
            this._generateIcon(uncheckedIcon, 'uncheck', 'uncheck-icon')}
          </li>
        ))}
      </ul>
    )
  }

  private _renderContentView() {
    const { foodDetails } = this.props.homePageMobx;
    if(isEmpty(foodDetails)) {
      return null;
    }
    return (
      <WingBlank>
        <div>
          {this._renderTopTimeView(foodDetails)}
          <WhiteSpace />
          {this._renderCarouselView(foodDetails)}
          <WhiteSpace />
          {this._renderIntroduceView(foodDetails)}
          <WhiteSpace />
          {this._renderAddOrRemoveView(foodDetails)}
          <WhiteSpace />
          {this._renderDeadlineView(foodDetails)}
        </div>
      </WingBlank>
    )
  }

  private _renderTopTimeView(data: IDailyFood) {
    return (
      <div className="common-title-container">
        <WhiteSpace />
        <h3>{data.title}</h3>
        <WhiteSpace />
        <span>{data.subTitle}</span>
        <WhiteSpace />
      </div>
    )
  }

  private  _renderCarouselView(data: IDailyFood) {
    const { extralImage } = data.foodList[0];
    return (
        <div className="carousel-container">
          {extralImage.map((val, idx) => (
              <img
                key={idx}
                src={val}
                alt="food"
                style={{ width: '100%', verticalAlign: 'top' }}
              />
          ))}
        </div>
    )
  }

  private _renderIntroduceView(data: IDailyFood) {
    const { foodName, foodBrief } = data.foodList[0];
    return (
      <div className="common-title-container">
        <h3>{foodName}</h3>
        <WhiteSpace />
        <p>{foodBrief}</p>
      </div>
    )
  }

  private _renderAddOrRemoveView(data: IDailyFood) {
    const { status, foodList: { 0:{price, originPrice }}} = data;
    const { values: {foodCount}, addOrRemove } = this.props.homePageMobx;
    return (
      <div className="add-remove-container">
        <div>
          <span className="unit">HKD</span>
          <span className="price">{price}</span>
          <span className="originPrice">{originPrice}</span>
        </div>
        <div>
          {status === HAS_FOODS ? (
            <Stepper
              showNumber
              min={0}
              value={foodCount}
              onChange={addOrRemove}
            />
          ) : status === NO_MORE_FOODS ? (
            <span>已售完</span>
          ) : status === IS_INTERCEPT ? (
            <span>已截單</span>
          ) : null}
        </div>
      </div>
    )
  }

  private _renderDeadlineView(data: IDailyFood) {
    const _endDate = endDate(data.endTimestamp);
    return (
      <p className="deadline">{_endDate}</p>
    )
  }

}
