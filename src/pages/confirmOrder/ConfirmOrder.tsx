import React from "react";
import { observer, inject } from "mobx-react";
import { List } from "antd-mobile";

import { IConfirmOrder } from "../../interfaces";
import "./ConfirmOrder.less";


import CommonHeader from "../../components/CommonHeader";
import { isEmpty } from "../../utils/common";

const Item = List.Item;
const Brief = Item.Brief;

@inject("ConfirmOrderMobx")
@observer
export default class ConfirmOrder extends React.Component<IConfirmOrder, {}> {

    constructor(props: IConfirmOrder) {
        super(props)
    }

    public async componentWillMount() {
        const { getDailyFoods } = this.props.ConfirmOrderMobx;
        this.props.ConfirmOrderMobx.dateFoodId = this.props.match.params.dateFoodId;
        await getDailyFoods(this.props.ConfirmOrderMobx.dateFoodId)
        this.props.hideLoading();
    }

    public render() {
        const { dateFoodId, foodDetails, foodDetailValues: { foodCount } } = this.props.ConfirmOrderMobx
        if (isEmpty(foodDetails)) {
            return null;
        }
        return (
            <div className="container">
                {this._renderHeader()}
                <div className="key-info">
                    <div className="key-info-title">
                        <span>
                            {this._textLengthFilter(foodDetails.foodName)}
                        </span>
                        <span>HKD {foodCount * foodDetails.price}.00</span>
                    </div>
                    <div className="key-info-count">
                        <span>
                            數量：
                        </span>
                        <span style={{color: 'red'}}>
                            {foodCount}
                        </span>
                    </div>
                    <div className="key-info-value">
                        <span>
                            總金額
                        </span>
                        <div>
                            <span>
                                HKD&nbsp;
                            </span>
                            <span style={{color: 'red'}}>
                                {foodDetails.price}.00
                            </span>
                        </div>
                        
                    </div>
                </div>
                <div className="description">
                    <div className="description-title">
                        {this._renderList()}
                    </div>
                </div>
                {this._renderButton()}
            </div>
        )
    };

    private _renderHeader() {
        return (
          <CommonHeader canBack>
            <span>訂單確認頁</span>
          </CommonHeader>
        );
    }

    private _renderList() {
        return (
            <List className="desc-list">
                <div className="desc-list-title">
                    <span>取餐資料</span>
                </div>
                <Item>
                    取餐日期<Brief>2018-11-23</Brief>
                </Item>
                <Item>
                    取餐地點<Brief>A</Brief>
                </Item>
                <Item>
                    取餐時間<Brief>12:15 - 13:15</Brief>
                </Item>
                <Item>
                    支付方式<Brief>現金支付</Brief>
                </Item>
                <Item>
                    送餐備註<Brief>例如：加飯、少辣</Brief>
                </Item>
            </List>    
        )
    }

    private _renderButton() {
        const {createOrder, dateFoodId, foodDetailValues: {foodCount}} = this.props.ConfirmOrderMobx
        return (
            <div className="button" onClick={() => createOrder(dateFoodId, foodCount, () => {
                this.props.history.push('/login')
            })}>
                <span>立即下單</span>
            </div>
        )
    }

    private _textLengthFilter(text: string) :string {
        if(text.length > 10) {
            return `${text.slice(0,10)}...`
        } else {
            return text
        }
    }

}