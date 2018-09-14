import React, { PureComponent } from 'react';
import { ListView, WingBlank } from 'antd-mobile';
//api
import { getArticleList } from '@/api/request';
//components
import CommonHeader from '@/components/CommonHeader';
import ListFooter from '@/components/ListFooter';
import Divider from '@/components/Divider';
//utils
import { loadingToast, hideToast } from '@/utils/loading';
import { BOTTOM_LOAD_STATUS } from '@/utils/global_params';
//style
import './FoodsListPage.less';

export default class FoodsListPage extends PureComponent {

  constructor(props) {
    super(props);
    this._offset = 0;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 != row2
    });
    this.state = {
      dataSource,
      isLoadingShow: true,
      bottomLoadingStatus: BOTTOM_LOAD_STATUS.LOADING,
      foodsList: []
    }
  }

  componentDidMount() {
    // loadingToast();
    this._getArticleList();
  }

  //api
  _getArticleList() {
    getArticleList(this._offset).then(data => {
      if(data.ro.ok) {
        // hideToast();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.data),
          isLoadingShow: false,
          bottomLoadingStatus: BOTTOM_LOAD_STATUS.NO_MORE_DATA
        });
      }
    });
  }

  //private function
  _onEndReached = () => {
    console.log(234);
  }

  //render

  _renderListFooter() {
    return (
      <ListFooter loadingStatus={this.state.bottomLoadingStatus} errorToDo={this._getArticleList}/>
    )
  }

  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <div className="food-list-item" key={rowID}>
            <img src={rowData.pic}/>
            <span>{rowData.title}</span>
        </div>
      )
    }

    return (
      <div className="food-list-container">
        <CommonHeader>
          <span>本週菜品</span>
        </CommonHeader>
        <ListView 
          ref={el => this._listView = el}
          dataSource={this.state.dataSource}
          pageSize={4}
          useBodyScroll
          scrollEventThrottle={500}
          renderFooter={() => this._renderListFooter()}
          renderRow={row}
          renderSeparator={(sectionID, rowID) => (<Divider key={rowID} bgColor="#efefef" height={8}/>)}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }
}
