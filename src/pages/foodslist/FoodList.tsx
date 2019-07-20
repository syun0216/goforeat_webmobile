import React from "react";
import { Drawer, List, Flex, NoticeBar } from "antd-mobile";
import { Link } from "react-router-dom";
//api
import { getFoodList } from "../../api/request";
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
import CommonListView from "../../components/CommonListView";
import CommonModal from "../../components/CommonModal";
//utils
import { isEmpty, getDeviceInfo } from "../../utils/common";
import { getCustomCookie } from "../../utils/auth";
//header
const checkedIcon = require("@/assets/checked.png");
const uncheckedIcon = require("@/assets/unchecked.png");
//sidebar
const order = require("@/assets/order.png");
const paytype = require("@/assets/payment.png");
const setting = require("@/assets/setting.png");
const topLogo = require("@/assets/logoTop.png");
const avatar = require("@/assets/notlogged.png");

const COMPONENT_HEIGHT: number = document.documentElement!.clientHeight;

@inject("foodListMobx")
// @inject("commonListViewMobx")
@observer
export default class FoodList extends React.Component<IFoodList, {}> {
  public _commonlist: any;
  constructor(props: IFoodList) {
    super(props);
  }

  public async componentDidMount() {
    const {
      getFoodPlaces,
      getQueryList,
      values: { currentPlace }
    } = this.props.foodListMobx;
    await getFoodPlaces();
    await getQueryList();
  }

  public componentDidUpdate() {
    console.log("did update");
  }

  public render() {
    const {
      values: { isDrawerShow, isPlaceMenuShow, isQueryListShow },
      toggleDrawer,
      togglePlaceMenu
    } = this.props.foodListMobx;
    const _showModal = isPlaceMenuShow || isDrawerShow;
    return (
      <div
        className={`food-list-container ${
          _showModal ? "noScroll" : "canScroll"
        }`}
      >
        <CommonModal
          isShow={_showModal}
          clickOutSide={() =>
            isDrawerShow
              ? toggleDrawer()
              : isPlaceMenuShow
              ? togglePlaceMenu()
              : {}
          }
        />
        {this._renderHeader()}
        {this._renderSidebarView()}
        {isQueryListShow ? this._renderQueryListView() : null}
        {isPlaceMenuShow ? this._renderMenuView() : null}
        {this._renderFoodListView()}
      </div>
    );
  }

  private _renderHeaderBeforeLogin() {
    return (
      <div className="sidebar-top">
        {GenerateIcon(avatar, "avatar", "sidebar-top-img")}
        <div className="sidebar-top-text-container">
          <span className="sidebar-top-text biggerFont">日日有得食</span>
          <Link to="/login">
            <span className="sidebar-top-text">立即登錄</span>
          </Link>
        </div>
        <div className="sidebar-top-login">
          <i className="fas fa-angle-right sidebar-top-login-arrow" />
        </div>
      </div>
    );
  }

  private _readerHeaderAfterLogin() {
    const userInfo = JSON.parse(getCustomCookie("userInfo")!);
    const { account, nickName, profileImg } = userInfo;
    return (
      <div className="sidebar-top">
        {GenerateIcon(profileImg, "avatar", "sidebar-top-img-round")}
        <div className="sidebar-top-text-container close">
          <span className="sidebar-top-text">{account}</span>
          <span className="sidebar-top-text">{nickName}</span>
          <span
            className="sidebar-top-text yellow"
            onClick={() => {
              this.props.showToast("fail", "暫未開放");
            }}
          >
            去更改
          </span>
        </div>
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
        leftContent={<i className="icon iconfont icon-indent menu-icon" />}
        onLeftClick={toggleDrawer}
        rightContent={
          <i className="icon iconfont icon-appstore location-icon" />
          // <img
          //   className="location-icon"
          //   alt="location"
          //   src={locationIcon}
          //   onClick={() => {
          //     const url =
          //       getDeviceInfo() === "ios"
          //         ? `'http://maps.apple.com/?q=${currentPlace.name}&ll=${currentPlace.lon},${currentPlace.lat}`
          //         : getDeviceInfo() === "android"
          //         ? `http://maps.google.com/maps?q=${currentPlace.name}`
          //         : "";
          //     url !== ""
          //       ? window.open(url, "_blank")
          //       : this.props.showToast("fail", "請在手機打開");
          //   }}
          // />
        }
      >
        <span className="common_title search-bar" onClick={togglePlaceMenu}>
          {currentPlace.name}
          <i className="icon iconfont icon-search"/>
        </span>
        {/* {isPlaceMenuShow ? (
          <i className="fas fa-angle-up icon-arrow arrow-icon" />
        ) : (
          <i className="fas fa-angle-down icon-arrow arrow-icon" />
        )} */}
        {/* <div className="placeInputBg" /> */}
      </CommonHeader>
    );
  }

  private _renderMenuView() {
    const {
      placeList,
      changePlace,
      togglePlaceMenu,
      values: { currentPlace }
    } = this.props.foodListMobx;
    if (placeList.length === 0) {
      return null;
    }
    return (
      <ul className="dropdown-menu">
        {placeList.map((v, i) => (
          <li
            className="dropdown-item"
            key={i}
            onClick={() => {
              changePlace(v, () => {
                if (this._commonlist) {
                  const { outsideRefresh } = this._commonlist.wrappedInstance;
                  if (!isEmpty(outsideRefresh)) {
                    outsideRefresh();
                    // console.log(this._commonlist);
                  }
                }
              });
            }}
          >
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
    const infoFlag = getCustomCookie("userInfo")!; //判断localStorage有没有userInfo
    const {
      values: { isDrawerShow }
    } = this.props.foodListMobx;
    const _drawerList = [
      {
        name: "我的訂單",
        icon: GenerateIcon(order, "order", "sidebar-icon"),
        path: "/myorder"
      }
      // {
      //   name: "支付方式",
      //   icon: GenerateIcon(paytype, "paytype", "sidebar-icon"),
      //   path: "/myorder"
      // },
      // {
      //   name: "系統設置",
      //   icon: GenerateIcon(setting, "setting", "sidebar-icon"),
      //   path: "/myorder"
      // }
    ];
    return (
      <div
        className={`sidebar-container ${
          isDrawerShow ? "sidebar-active" : null
        }`}
      >
        {infoFlag
          ? this._readerHeaderAfterLogin()
          : this._renderHeaderBeforeLogin()}
        {_drawerList.map((item, key) => (
          <Link to={item.path} key={key}>
            <List.Item key={key} multipleLine thumb={item.icon}>
              {item.name}
            </List.Item>
          </Link>
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
        onClick={() =>
          this.props.history.push({pathname:"/content", state:{
            url: queryList[0].url,
            title: queryList[0].title
          }})
        }
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
    const {
      thumbnail,
      name,
      brief,
      price,
      date,
      dateFoodId,
      originPrice,
      canteenName
    } = rowData;
    return (
      <Link
        key={rowID}
        to={`/foodDetails/${dateFoodId}`}
      >
        <div className="food-list-item">
          {GenerateIcon(thumbnail, "thumbnail", "item-thumbnail")}
          <div className="item-details">
            <div className="item-container">
              <span className="item-foodname">{name}</span>
            </div>
            <div className="item-container">
              <span className="item-label">日期</span>
              <span className="item-value">{date}</span>
            </div>
            <div className="item-container">
              <span className="item-label">餐廳</span>
              <span className="item-value">{canteenName}</span>
            </div>
            <div className="item-container">
              <span className="item-label">堂食</span>
              <span className="item-value" style={originPrice ? {textDecoration: 'line-through',textDecorationColor: '#666'} : {}}>
                {originPrice ? `$${parseFloat(originPrice).toFixed(2)}` : "暫無"}
              </span>
            </div>
            {/* <p className="item-brief">{_brief}</p> */}
            <div className="item-container">
              <span className="item-price">
                HKD
                <span
                  style={{
                    color: "#ff5858",
                    fontSize: "16px",
                    display: "inline-block",
                    marginLeft: "5px"
                  }}
                >
                  {price}
                </span>
              </span>
              <span className="item-btn">立即預訂</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  private _renderFoodListView() {
    const {
      values: { currentPlace, currentStar },
      setStar
    } = this.props.foodListMobx;
    if (currentPlace.id === 1) {
      return null;
    }
    const Header = (
      <Flex justify="between">
        <span style={{ display: "inline-block", padding: "5px 0 10px" }}>
          精選菜單
        </span>
        <span style={{ display: "inline-block", padding: "5px 0 10px" }}>
          评分: {currentStar}
        </span>
      </Flex>
    );
    return (
      <CommonListView
        ref={cl => (this._commonlist = cl)}
        requestFunc={getFoodList}
        renderHeader={() => Header}
        renderItem={this._renderFoodListItem}
        isItemSeparatorShow
        extraParams={{ placeId: currentPlace.id }}
        getRawData={data => {
          setStar(data.star);
        }}
      />
    );
  }
}
