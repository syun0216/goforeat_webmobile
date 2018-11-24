import { observable, action, computed, decorate } from 'mobx';
// antd
import { ListView } from 'antd-mobile';
//utils
import { BOTTOM_LOAD_STATUS } from '../utils/global_params';

const { LOADING, LOAD_FAILED, NO_DATA, NO_MORE_DATA } = BOTTOM_LOAD_STATUS;

class CommonListView {
  public listData = new ListView.DataSource({
    rowHasChanged: (row1: any,row2:any) => row1 !== row2
  })
  public listFooterStatus:number = LOADING;
  public listDataRawArr: any = [];

  public setListFooterStatus(status: number):void {
    this.listFooterStatus = status;
  }

  public setListData(data:any) {
    this.listDataRawArr = data;
    this.listData = this.listData.cloneWithRows(data);
  }

  public concatListData(data:any) {
    this.listDataRawArr = this.listDataRawArr.concat(data);
    this.listData = this.listData.cloneWithRows(this.listDataRawArr);
  }
}

decorate(CommonListView, {
  listData: observable,
  listFooterStatus: observable,
  listDataRawArr: observable,
  setListFooterStatus: action.bound,
  setListData: action.bound,
  concatListData: action.bound
});

export default CommonListView;