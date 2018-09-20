import React,{PureComponent} from 'react';
import { Menu, ActivityIndicator, List, WhiteSpace, Stepper, TabBar, WingBlank, NoticeBar, Drawer } from 'antd-mobile';
import { Link } from 'react-router-dom';
//style
import './HomePage.less';
//api
import { getDailyFoods, foodPlaces, queryList } from '@/api/request';
//components
import CommonHeader from '@/components/CommonHeader';
import BottomOrder from '@/components/BottomOrder';
//utils
import { getWeekDay, formatDate, endDate } from '@/utils/common';
import { loadingToast, hideToast } from '@/utils/loading';
//pages
import FoodsListPage from '@/pages/foodslistpage/FoodsListPage';


const COMPONENT_HEIGHT = document.documentElement.clientHeight - 45;

const HAS_FOODS = 1;
const NO_MORE_FOODS = 2;
const IS_INTERCEPT = 3;

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      placeList: [],
      foodList: [],
      currentPlace: '未選擇',
      warningTipsData: [],
      formatDate: {
        date: '',
        week: '',
        endDate: ''
      },
      foodCount: 0,
      soldStatus: '',
      selectedTab: 'foodDetails',
      isPlaceMenuShow: false,
      isDrawerShow: false,
      isWarningTipShow: true,
      isLoadingShow: true,
      isRefreshShow: false,
      isTabBarShow: true,
    };
  }

  componentDidMount() {
    loadingToast()
    this._getFoodPlaces();
    this._getWarningTips();
  }

  //api
  _getFoodPlaces() {
    foodPlaces().then(data => {
      if(data.ro.ok) {
        data.data = data.data.map(v => ({
          value: v.id,
          label: v.name
        }))
        this.setState({
          placeList: data.data,
          currentPlace: data.data[0]
        });
        this._getFoodDetails(data.data[0].value);
      }
    });
  }

  _getFoodDetails(placeId) {
    getDailyFoods(placeId).then(data => {
      if(data.ro.ok) {
        hideToast();
        this.setState({
          foodList: data.data.foodList,
          soldStatus: data.data.status,
          formatDate: {
            date: formatDate(data.data.timestamp),
            week: getWeekDay(data.data.timestamp),
            endDate: endDate(data.data.endTimestamp)
          }
        });
      }
    });
  }

  _getWarningTips() {
    queryList().then(data => {
      if(data.ro.ok) {
        // console.log(data);
        this.setState({
          warningTipsData: data.data,
          isWarningTipShow: true
        })
      }
    })
  }

  //private function 
  _showPlaceSelector = (e) => {
    // e.preventDefault();
    this.setState({
      isPlaceMenuShow: !this.state.isPlaceMenuShow,
    });
  }

  _changePlace = (idx_arr) => {
    this.state.placeList.forEach(data => {
      if(data.value === idx_arr[0]) {
        this.setState({
          currentPlace: data,
          isPlaceMenuShow: false
        });
        this._getFoodDetails(data.value);
      }
    })
  }

  _toggleDrawer= () => {
    this.setState({
      isDrawerShow: !this.state.isDrawerShow
    })
  }

  _addRoRemove = (val) => {
    this.setState({
      foodCount: val,
      isTabBarShow: val === 0
    });
  }

  //render
  _renderLoadingMask() {
    return (
      <div style={{ position: 'absolute', width: '100%', height: COMPONENT_HEIGHT, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    )
  }

  _renderMenuView() {
    return (
      <Menu
        className="single-foo-menu"
        data={this.state.placeList}
        value={[this.state.currentPlace.value]}
        level={1}
        onChange={this._changePlace}
        height={COMPONENT_HEIGHT}
      />
    )
  }

  _renderSidebarView() {
    let _drawerList = [
      {name: '我的訂單', icon:(<img alt="order" className="sidebar-icon" src={require('@/assets/order.png')}/>), path: '/myorder'}, 
      {name: '支付方式',icon:(<img alt="paytype" className="sidebar-icon" src={require('@/assets/payment.png')}/>), path: '/myorder'},
      {name: '系統設置',icon: (<img alt="setting" className="sidebar-icon" src={require('@/assets/setting.png')}/>), path: '/myorder'}
    ];
    return (
      <div>
        <div className="sidebar-top">
          <img alt="logo" src={require("@/assets/logoTop.png")}/>
        </div>
        {_drawerList.map((item, key) => (
          <Link to={item.path} key={key}>
            <List.Item multipleLine thumb={item.icon}>{item.name}</List.Item>
          </Link>
        ))}
      </div>
    )
  }

  _renderNoticeView() {
    let { warningTipsData } = this.state;
    if(warningTipsData.length === 0) return;
    return (
      <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }} mode="closable" icon={<i className="fas fa-bell"></i>} onClick={() => this.props.history.push('/content', {data: warningTipsData[0]})}>
        {warningTipsData[0].title}
      </NoticeBar>
    )
  }

  _renderTopTimeView() {
    let {week,date} = this.state.formatDate;
    return (
      <div className="common-title-container">
        <WhiteSpace />
        <h3>{week}的餐單</h3>
        <WhiteSpace />
        <span>{date}</span>
        <WhiteSpace />
      </div>
    )
  }

  _renderCarouselView() {
    let { extralImage } = this.state.foodList[0];
    return (
        <div className="carousel-container">
          {extralImage.map((val, idx) => (
              <img
                key={idx}
                src={val}
                alt="food"
                style={{ width: '100%', verticalAlign: 'top' }}
                // onLoad={() => {
                //   // fire window resize event to change height
                //   window.dispatchEvent(new Event('resize'));
                // }}
              />
          ))}
        </div>
    )
  }

  _renderIntroduceView() {
    let { foodName, foodBrief } = this.state.foodList[0];
    return (
      <div className="common-title-container">
        <h3>{foodName}</h3>
        <WhiteSpace />
        <p>{foodBrief}</p>
      </div>
    )
  }

  _renderAddOrRemoveView() {
    let { soldStatus, foodList: { 0:{price, originPrice }}} = this.state;
    return (
      <div className="add-remove-container">
        <div>
          <span className="unit">HKD</span>
          <span className="price">{price}</span>
          <span className="originPrice">{originPrice}</span>
        </div>
        <div>
          {soldStatus === HAS_FOODS ? (
            <Stepper
              showNumber
              min={0}
              value={this.state.foodCount}
              onChange={this._addRoRemove}
            />
          ) : soldStatus === NO_MORE_FOODS ? (
            <span>已售完</span>
          ) : soldStatus === IS_INTERCEPT ? (
            <span>已截單</span>
          ) : null}
        </div>
      </div>
    )
  }

  _renderDeadlineView() {
    let { endDate } = this.state.formatDate;
    return (
      <p className="deadline">{endDate}</p>
    )
  }

  _renderFoodDetailsView(foodList) {
    return (
      <WingBlank>
        {foodList.length > 0 ? (
        <div>
          {this._renderTopTimeView()}
          <WhiteSpace />
          {this._renderCarouselView()}
          <WhiteSpace />
          {this._renderIntroduceView()}
          <WhiteSpace />
          {this._renderAddOrRemoveView()}
          <WhiteSpace />
          {this._renderDeadlineView()}
        </div>  
        ) : null}
      </WingBlank>
    )
  }

  render() {
    const {isPlaceMenuShow, placeList, foodList, currentPlace, isDrawerShow} = this.state;
    return (
      <div className="homepage-container">
        <TabBar
          className="tabbar-container"
          unselectedTintColor="#333"
          tintColor="#d93a49"
          barTintColor="white"
          hidden={!this.state.isTabBarShow}
        >
          <TabBar.Item
            title="每日菜品"
            key="Daily"
            icon={<img alt="shape" className="tab-icon" src={require('@/assets/Shape_inactive.png')}/>}
            selectedIcon={<img alt="shape" className="tab-icon" src={require('@/assets/Shape.png')}/>}
            selected={this.state.selectedTab === 'foodDetails'}
            onPress={() => {
              this.setState({
                selectedTab: 'foodDetails',
              });
            }}
          >
            <Drawer
              className="my-drawer"
              style={{ minHeight: COMPONENT_HEIGHT}}
              enableDragHandle
              contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
              sidebarStyle={{ minWidth: '75%' }}
              sidebar={this._renderSidebarView()}
              open={isDrawerShow}
              onOpenChange={this._toggleDrawer}
              touch={false}
            >
              <CommonHeader leftContent={<img alt="menu" src={require('@/assets/menu.png')} style={{width: '2em', height: '1em'}}/>} onLeftClick={this._toggleDrawer}>
                <span onClick={this._showPlaceSelector}>{currentPlace.label}</span>
                {!isPlaceMenuShow ? <i className="fas fa-angle-down icon-arrow"></i> :
                <i className="fas fa-angle-up icon-arrow"></i>}
              </CommonHeader>
              {isPlaceMenuShow ? placeList.length > 0 ? this._renderMenuView() : this._renderLoadingMask() : null}
              {this._renderNoticeView()}
              { this._renderFoodDetailsView(foodList) }
              <BottomOrder />
            </Drawer>
          </TabBar.Item>
          <TabBar.Item
            title="本週菜單"
            key="Weekly"
            icon={<img alt="order" className="tab-icon" src={require('@/assets/date.png')}/>}
            selectedIcon={<img alt="order" className="tab-icon" src={require('@/assets/date_active.png')}/>}
            selected={this.state.selectedTab === 'foodList'}
            onPress={() => {
              this.setState({
                selectedTab: 'foodList',
              });
            }}
          >
            <FoodsListPage place={currentPlace}/>
          </TabBar.Item>
        </TabBar>
      </div>
    )
  }
}