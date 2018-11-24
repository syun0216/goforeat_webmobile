import React,{Component} from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import { inject, observer } from 'mobx-react';
//interface
import { IMyOrder } from '../../interfaces';
import { IMyOrderItem } from '../../interfaces/server';
//component
import CommonHeader from '../../components/CommonHeader';
import CommonListView from '../../components/CommonListView';
//api
import { myOrder } from '../../api/request';
//utils
import { ORDER_STATUS } from '../../utils/global_params';

const { ORDER_DELIVERING, ORDER_FINISHED, ORDER_CANCEL, ORDER_ALL } = ORDER_STATUS;

@inject('myOrderMobx')
@observer
export default class MyOrder extends Component<IMyOrder, {}> {
  private timer: any;
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
    )
  }

  private _renderHeader() {
    return (
      <CommonHeader canBack>
        <span>我的订单</span>
      </CommonHeader>
    )
  }

  private _renderTabBar(props: any) {
    return (<Sticky>
      {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
  }

  private _renderTabView() {
    const tabs = [{title: '待配送',value: ORDER_DELIVERING},{title: '已完成',value: ORDER_FINISHED},{title:'已取消',value: ORDER_CANCEL},{title: '全部',value: ORDER_ALL}];
    const { setCurrentOrderStatus } = this.props.myOrderMobx;
    return (
      <StickyContainer>
        <Tabs tabs={tabs}
          onTabClick={(tab, index) => { setCurrentOrderStatus(tab.value) }}
          animated={false}
          tabBarUnderlineStyle={{borderColor:'#FF1A1A'}}
          tabBarActiveTextColor='#FF1A1A'
          renderTabBar={this._renderTabBar}
        >
          {this._renderCommonListView()}
        </Tabs>
      </StickyContainer>
    )
  }

  private _renderCommonListView() { 
    const { currentOrderStatus } = this.props.myOrderMobx;
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <CommonListView 
          requestFunc={myOrder}
          renderItem={this._renderMyOrderItem}
          isItemSeparatorShow
          extraParams={{status:currentOrderStatus}}
        />
      </div>
    )
  }

  private _renderMyOrderItem(rowData: IMyOrderItem,
    sectionID: number,
    rowID: number) {
      return (
        <div key={rowData.orderId}>123</div>
      )
    }
}