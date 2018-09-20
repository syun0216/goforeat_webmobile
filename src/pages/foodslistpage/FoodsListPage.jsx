import React, { PureComponent } from 'react';
import { ListView } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
//api
import { getArticleList } from '@/api/request';
//components
import CommonHeader from '@/components/CommonHeader';
import ListFooter from '@/components/ListFooter';
import Divider from '@/components/Divider';
//utils
// import { loadingToast, hideToast } from '@/utils/loading';
import { BOTTOM_LOAD_STATUS } from '@/utils/global_params';
//style
import './FoodsListPage.less';

class FoodsListPage extends PureComponent {

  constructor(props) {
    super(props);
    this._offset = 0;
    this.place = null;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      dataSource,
      isLoadingShow: true,
      bottomLoadingStatus: BOTTOM_LOAD_STATUS.LOADING,
      foodsList: []
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('willreceive')
  //   const { place: {value} } = nextProps;
  //   this._getArticleList(value);
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('should')
  //   return true;
  // };
  
  
  
  

  componentDidMount() {
    console.log('didmount');
    const { place: {value} } = this.props;
    this._getArticleList(value);
  }

  //api
  _getArticleList(placeId) {
    getArticleList(this._offset, placeId).then(data => {
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
        <div className="food-list-item" key={rowID} onClick={() => this.props.history.push('/content',{data: rowData})}>
            <img src={rowData.pic} alt="food_pic"/>
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

export default withRouter(FoodsListPage);