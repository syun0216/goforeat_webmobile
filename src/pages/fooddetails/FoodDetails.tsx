import React from "react";
import {
  WhiteSpace,
  Stepper,
  WingBlank,
  Flex,
  Button,
  Carousel
} from "antd-mobile";
//style
import "./FoodDetails.less";
//api
import {getCommentList} from "../../api/request";
//mobx
import { observer, inject } from "mobx-react";
//interface
import { IFoodDetails } from "../../interfaces";
import { IDailyFood, ICommentListItem } from "../../interfaces/server";
//components
import CommonHeader from "../../components/CommonHeader";
import GenerateIcon from "../../components/GenerateIcon";
import SlideUp from "../../components/SlideUp/SlideUp";
import CommonListView from "../../components/CommonListView";
//utils
import { isEmpty } from "../../utils/common";

const HAS_FOODS: number = 1;
const NO_MORE_FOODS: number = 2;
const IS_INTERCEPT: number = 3;

const add_png = require('@/assets/add.png');
const remove_png = require('@/assets/remove.png');

@inject("foodDetailsMobx")
@observer
export default class FoodDetails extends React.Component<IFoodDetails, {}> {

  public _commonList : any;

  constructor(props: IFoodDetails) {
    super(props);
  }

  public async componentDidMount() {
    const { getDailyFoods,values: {foodCount}, setCount } = this.props.foodDetailsMobx;
    const { dateFoodId } = this.props.match.params;
    await getDailyFoods(dateFoodId);
    foodCount > 1 && setCount(1);
  }

  public render() {
    return (
      <div className="homepage-container">
        {this._renderHeader()}
        {this._renderCommentView()}
        {this._renderContentView()}
      </div>
    );
  }

  //logic
  private createOrder = () => {
    const { dateFoodId } = this.props.match.params;
    const {values: {foodCount}} = this.props.foodDetailsMobx
    if(!dateFoodId) {
      this.props.showToast('fail', '無效的url參數');
      return;
    }
    this.props.history.push({pathname:'/confirmorder',state:{params: dateFoodId, amount:foodCount}});
  }

  //render
  private _renderHeader() {
    
    return (
      <CommonHeader canBack>
        <span className="title">
          {this._renderTopTimeView()}
        </span>
      </CommonHeader>
    );
  }

  private _renderCommentView() {
    const { values: {isCommentViewShow}, toggleCommentView, foodDetails } = this.props.foodDetailsMobx;
    if (isEmpty(foodDetails)) {
      return null;
    }
    return (
      <SlideUp isShow={isCommentViewShow} closeFunc={toggleCommentView} title="評論詳情" height={10}>
        <CommonListView 
          ref={cl => (this._commonList = cl)}
          requestFunc={getCommentList}
          renderItem={this._renderCommentItemView}
          isItemSeparatorShow
          extraParams={{foodId: foodDetails.foodId}}
        />
      </SlideUp>
    )
  }

  private _renderCommentItemView(
    rowData: ICommentListItem,
    sectionID: number,
    rowID: number
  ) {
    const { profileImg, nickName, comment, star } = rowData;
    return (
      <div className="comment-container" key={rowID}>
        <img src={profileImg || require('../../assets/defaultAvatar.png')} alt="avatar"/>
        <ul>
          <li>{nickName}</li>
          <li>評分:{star}星</li>
          <li>{comment}</li>
        </ul>
      </div>
    )
  }

  private _renderContentView() {
    const { foodDetails } = this.props.foodDetailsMobx;
    if (isEmpty(foodDetails)) {
      return null;
    }
    return (
      <WingBlank>
        <div>
          <WhiteSpace />
          {/* {this._renderTopTimeView(foodDetails)} */}
          <WhiteSpace />
          {this._renderCarouselView(foodDetails)}
          <WhiteSpace />
          {this._renderIntroduceView(foodDetails)}
          <WhiteSpace />
          {this._renderAddOrRemoveView(foodDetails)}
          <WhiteSpace />
          {this._renderBottomConfirm(foodDetails)}
          <WhiteSpace />
        </div>
      </WingBlank>
    );
  }

  private _renderTopTimeView() {
    const { foodDetails } = this.props.foodDetailsMobx;
    if (isEmpty(foodDetails)) {
      return null;
    }
    return (
      <div className="top-title-container">
        <WhiteSpace />
        <h3>{foodDetails.title}</h3>
        {/* <WhiteSpace /> */}
        <span>{foodDetails.subTitle}</span>
        <WhiteSpace />
      </div>
    );
  }

  private _renderCarouselView(data: IDailyFood) {
    const { extralImage } = data;
    return (
      <div className="carousel-container">
        <Carousel
          autoplay={true}
          infinite
        >
          {extralImage.map((val, idx) => (
            <img
              key={idx}
              src={val}
              alt="food"
              style={{ width: '100%',height: '5rem', verticalAlign: "top",objectFit:'cover' }}
            />
          ))}
        </Carousel>
      </div>
    );
  }

  private _renderIntroduceView(data: IDailyFood) {
    const { foodName, foodBrief, canteenName, commentAmount, foodId } = data;
    const { toggleCommentView, values: {isFavorite, favorCount}, addFavorite } = this.props.foodDetailsMobx;
    return (
      <div className="common-title-container">
        <div className="flex-between food-name">
          <span>{foodName}</span>
          <span onClick={() => addFavorite(foodId, isFavorite ? 0 : 1)}>
            <i className={`heart ${isFavorite ? 'active' : ''}`}/>
            {favorCount}次贊
          </span>
        </div>
        <WhiteSpace />
        <div className="flex-between food-canteen">
          <span>
            {GenerateIcon(require('@/assets/food.png'), 'food', 'food-img')}
            {canteenName}
          </span>
          <span onClick={toggleCommentView}>
            <i className="comment"/>
            {commentAmount} 條
          </span>
        </div>
        <WhiteSpace />
        <p>{foodBrief}</p>
      </div>
    );
  }

  private _renderAddOrRemoveView(data: IDailyFood) {
    const { status, price } = data;
    const {
      values: { foodCount },
      addOrRemove
    } = this.props.foodDetailsMobx;
    return (
      <div className="add-remove-container">
        <div>
          <span className="unit">HKD</span>
          <span className="price">{price}</span>
        </div>
        <div>
          {status === HAS_FOODS ? (
            <Flex justify="around" align="center" style={{width: '100px'}}>
              <Flex.Item><div onClick={() => addOrRemove('remove')}>{GenerateIcon(remove_png,'remove','removeicon')}</div></Flex.Item>
              <Flex.Item><div className="amount">{foodCount}</div></Flex.Item>
              <Flex.Item><div onClick={() => addOrRemove('add')}>{GenerateIcon(add_png, 'add', 'addicon')}</div></Flex.Item>
            </Flex>
          ) : status === NO_MORE_FOODS ? (
            <span>已售完</span>
          ) : status === IS_INTERCEPT ? (
            <span>已截單</span>
          ) : null}
        </div>
      </div>
    );
  }

  private _renderBottomConfirm(data: IDailyFood) {
    const { values: {foodCount} } = this.props.foodDetailsMobx;
    const { price, status } = data;
    return (
      <div className="footer">
        <div>
          <span>HKD</span>
          <span className="price">{(price*foodCount).toFixed(2)}</span>
        </div>
        <Button
          inline
          size="small"
          className="btn"
          onClick={() => {
            if(status !== HAS_FOODS) {
              this.props.showToast("info", "已停止下单");
              return;
            }
            this.createOrder();
          }}
        >
          立即預訂
          {GenerateIcon(require('@/assets/double-arrow.png'), 'double-arrow', 'double-arrow')}
        </Button>
      </div>
    );
  }
}
