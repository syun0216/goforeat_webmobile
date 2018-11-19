import { observable, action, computed } from 'mobx';
// antd
import { ListView } from 'antd-mobile';
//utils
import { BOTTOM_LOAD_STATUS } from '../utils/global_params';

const { LOADING, LOAD_FAILED, NO_DATA, NO_MORE_DATA } = BOTTOM_LOAD_STATUS;

export default class CommonListView {
  @observable public listData = new ListView.DataSource({
    rowHasChanged: (row1: any,row2:any) => row1 !== row2
  })
  @observable public listFooterStatus:number = LOADING;
  private listDataRawArr: any;

  @action.bound
  public setListFooterStatus(status: number):void {
    this.listFooterStatus = status;
  }

  @action.bound
  public setListData(data:any) {
    this.listDataRawArr = data;
    this.listData = this.listData.cloneWithRows(data);
  }

  @action.bound
  public concatListData(data:any) {
    this.listDataRawArr = this.listDataRawArr.concat(data);
    this.listData = this.listData.cloneWithRows(this.listDataRawArr);
  }

}