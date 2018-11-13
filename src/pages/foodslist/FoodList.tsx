import React from 'react';
import {Drawer,List,ListView} from 'antd-mobile';
import { Link } from 'react-router-dom';
//style
import "./FoodList.less";
//interface
import {IFoodList} from '../../interfaces';
import {IFoodListItem} from '../../interfaces/server';
//mobx
import { observer, inject } from 'mobx-react';
//components
import CommonHeader from '../../components/CommonHeader';
import GenerateIcon from '../../components/GenerateIcon';
import Divider from '../../components/Divider';
//header
const menuIcon = require("@/assets/menu.png");
const checkedIcon = require("@/assets/checked.png");
const uncheckedIcon = require("@/assets/unchecked.png");
//sidebar
const order = require("@/assets/order.png");
const paytype = require("@/assets/payment.png");
const setting = require("@/assets/setting.png");
const topLogo = require("@/assets/logoTop.png");
const avatar = require("@/assets/avatar.png");

const COMPONENT_HEIGHT: number = document.documentElement!.clientHeight;

@inject("basicMobx")
@inject("foodListMobx")
@observer
export default class FoodList extends React.Component<IFoodList, {}> {
  private offset: number = 0;
  private _listView: any;
  constructor(props: IFoodList) {
    super(props);
  }

  public async componentDidMount() {
    const { getFoodPlaces } = this.props.foodListMobx;
    await getFoodPlaces();
  }

  public render() {
    const {
      values: { isDrawerShow, isPlaceMenuShow },
      toggleDrawer, foodList
    } = this.props.foodListMobx;
    return (
      <div className="app food-list-container">
        <Drawer
          className="my-drawer"
          style={{ minHeight: COMPONENT_HEIGHT}}
          enableDragHandle
          contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
          sidebarStyle={{ width: '75%' }}
          sidebar={this._renderSidebarView()}
          open={isDrawerShow}
          onOpenChange={toggleDrawer}
          touch={false}
        >
          {this._renderHeader()}
          { isPlaceMenuShow ? this._renderMenuView() : null }
          { this._renderFoodListView() }
        </Drawer>
      </div>
    )
  }

  private _renderHeader() {
    const { toggleDrawer, togglePlaceMenu, values: {currentPlace, isPlaceMenuShow} } = this.props.foodListMobx;
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
        <div className="placeInputBg" />
      </CommonHeader>
    );
  }

  private _renderMenuView() {
    const { placeList, changePlace, values: {currentPlace} } = this.props.foodListMobx;
    console.log({placeList,length:placeList.length});
    if(placeList.length === 0) {return null};
    return (
      <ul className="dropdown-menu">
        {placeList.map((v, i) => (
          <li className="dropdown-item" key={i} onClick={() => changePlace(v)}>
            {v.name}
            { v.name === currentPlace.name ? GenerateIcon(checkedIcon, 'check', 'check-icon') :
            GenerateIcon(uncheckedIcon, 'uncheck', 'uncheck-icon')}
          </li>
        ))}
      </ul>
    )
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
          {GenerateIcon(avatar, "avatar", "sidebar-top-img")}
          <div className="sidebar-top-text-container">
            <span className="sidebar-top-text biggerFont">
              日日有得食
            </span>
            <Link to="/login">
              <span className="sidebar-top-text">
                立即登錄
              </span>
            </Link>
          </div>
          <div className="sidebar-top-login">
            <i className="fas fa-angle-right sidebar-top-login-arrow" />
          </div>
        </div>
        {_drawerList.map((item, key) => (
          <List.Item key={key} multipleLine thumb={item.icon}>
            {item.name}
          </List.Item>
        ))}
      </div>
    );
  }

  private _goToLogin() {
    return (
      <Link to="/login">
        <div>
          <span>
            1
          </span>
        </div>
      </Link>
    )
  }

  private _renderFoodListItem(rowData: IFoodListItem,sectionID: number, rowID: number) {
    const { thumbnail, name, brief, price, date, dateFoodId } = rowData;
    const _brief = brief.split("").join(" ");
    return (
      <Link to={`/foodDetails/${dateFoodId}`}>
        <div className="food-list-item">
          {GenerateIcon(thumbnail, 'thumbnail', 'item-thumbnail')}
          <div className="item-details">
            <div className="item-container">
              <span className="item-foodname">{name}</span>
              <span className="item-date">{date}</span>
            </div>
            <p className="item-brief">{_brief}</p>
            <div className="item-container">
              <span className="item-price">HKD  {price}</span>
              <span className="item-btn">立即預訂</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  private _renderFoodListView() {
    const {foodList} = this.props.foodListMobx;
    return (
      <ListView
        ref={el => this._listView = el}
        className="food-list-view"
        dataSource={foodList}
        pageSize={5}
        useBodyScroll
        scrollEventThrottle={500}
        renderRow={this._renderFoodListItem}
        renderSeparator={(sectionID, rowID) => <Divider key={rowID} bgColor="transparent" height="10px"/>}
      />
    )
  }

}