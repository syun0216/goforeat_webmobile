import React from "react";
import { observer, inject } from "mobx-react";
import { List, InputItem } from "antd-mobile";

import { IConfirmOrder } from "../../interfaces";
import "./ConfirmOrder.less";


import CommonHeader from "../../components/CommonHeader";
import { isEmpty } from "../../utils/common";
import { stat } from "fs";

const Item = List.Item;
const Brief = Item.Brief;

@inject("ConfirmOrderMobx")
@observer
export default class ConfirmOrder extends React.Component<IConfirmOrder, {}> {

    constructor(props: IConfirmOrder) {
        super(props)
    }

    public async componentWillMount() {
        const { createOrder } = this.props.ConfirmOrderMobx;
        const { state } = this.props.history.location;
        if(!state.params) {
            this.props.showToast('fail', '參數有誤');
            return;
        }
        this.props.ConfirmOrderMobx.dateFoodId = state.params;
        await createOrder(state.params, state.amount)
        this.props.hideLoading();
    }

    public render() {
        const { createdOrder } = this.props.ConfirmOrderMobx
        if (isEmpty(createdOrder)) {
            return null;
        }
        return (
            <div className="container">
                {this._renderHeader()}
                <div className="key-info">
                    <div className="key-info-title">
                        <span>
                            {this._textLengthFilter(createdOrder.foodName)}
                        </span>
                        <span>HKD {createdOrder.foodMoney}.00</span>
                    </div>
                    <div className="key-info-count">
                        <span>
                            數量：
                        </span>
                        <span style={{color: 'red'}}>
                            {createdOrder.foodNum}
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
                                {createdOrder.totalMoney}.00
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
        const { createdOrder, remark, setRemark } = this.props.ConfirmOrderMobx
        return (
            <List className="desc-list">
                <div className="desc-list-title">
                    <span>取餐資料</span>
                </div>
                <Item>
                    取餐日期<Brief style={{color: 'red'}}>{createdOrder.takeDate}</Brief>
                </Item>
                <Item>
                    取餐地點<Brief>{createdOrder.takeAddress}</Brief>
                </Item>
                <Item>
                    取餐時間<Brief>{createdOrder.takeTime}</Brief>
                </Item>
                <Item>
                    支付方式<Brief>現金支付</Brief>
                </Item>
                <InputItem value={remark} onChange={(name) => setRemark(name)} placeholder="例如：加飯、少辣">
                    送餐備註
                </InputItem>
            </List>    
        )
    }

    private _renderButton() {
        const {confirmOrder} = this.props.ConfirmOrderMobx
        return (
            <div className="button" onClick={() => confirmOrder(() => {
                this.props.history.push('/myorder')
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