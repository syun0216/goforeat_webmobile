import React from "react";
import { WhiteSpace, Stepper, WingBlank, Flex, Button } from "antd-mobile";
//style
import "./FoodDetails.less";
//mobx
import { observer, inject } from "mobx-react";
//interface
import { IFoodDetails } from "../../interfaces";
import { IDailyFood } from "../../interfaces/server";
//components
import CommonHeader from "../../components/CommonHeader";
import GenerateIcon from "../../components/GenerateIcon";
//utils
import { isEmpty } from "../../utils/common";
import { Link } from "react-router-dom";

const HAS_FOODS: number = 1;
const NO_MORE_FOODS: number = 2;
const IS_INTERCEPT: number = 3;

@inject("basicMobx")
@inject("foodDetailsMobx")
@observer
export default class FoodDetails extends React.Component<IFoodDetails, {}> {
  constructor(props: IFoodDetails) {
    super(props);
    console.log(props);
  }

  public async componentDidMount() {
    const { getDailyFoods } = this.props.foodDetailsMobx;
    const { dateFoodId } = this.props.match.params;
    await getDailyFoods(dateFoodId);
    this.props.hideLoading();
  }

  public render() {
    return (
      <div className="homepage-container">
        {this._renderHeader()}
        {this._renderContentView()}
      </div>
    );
  }

  private _renderHeader() {
    return (
      <CommonHeader canBack>
        <span>每日推薦</span>
      </CommonHeader>
    );
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
          {this._renderTopTimeView(foodDetails)}
          <WhiteSpace />
          {this._renderCarouselView(foodDetails)}
          <WhiteSpace />
          {this._renderIntroduceView(foodDetails)}
          <WhiteSpace />
          {this._renderAddOrRemoveView(foodDetails)}
          <WhiteSpace />
          {this._renderBottomConfirm()}
          <WhiteSpace />
        </div>
      </WingBlank>
    );
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
    );
  }

  private _renderCarouselView(data: IDailyFood) {
    const { extralImage } = data;
    return (
      <div className="carousel-container">
        {extralImage.map((val, idx) => (
          <img
            key={idx}
            src={val}
            alt="food"
            style={{ width: "100%", verticalAlign: "top" }}
          />
        ))}
      </div>
    );
  }

  private _renderIntroduceView(data: IDailyFood) {
    const { foodName, foodBrief } = data;
    return (
      <div className="common-title-container">
        <h3>{foodName}</h3>
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
            <Stepper
              showNumber
              min={1}
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
    );
  }

  private _renderBottomConfirm() {
    const { sum, foodDetails } = this.props.foodDetailsMobx
    return (
      <div className="footer">
        <div>
          <span>HKD</span>
          <span>&nbsp;{sum}</span>
        </div>
        <Link to={`/confirmOrder/${foodDetails.dateFoodId}`}>
          <Button type="warning" inline size="small" style={{ borderRadius: '15px',background: '#d93a49' }}>立即下單</Button>
        </Link>
      </div>
    )
  }
}
