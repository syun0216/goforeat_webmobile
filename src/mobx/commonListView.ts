import { observable, action, computed } from 'mobx';
// antd
import { ListView } from 'antd-mobile';
//utils
import { BOTTOM_LOAD_STATUS } from '../utils/global_params';

const { LOADING, LOAD_FAILED, LOAD_HAS_MORE, NO_MORE_DATA } = BOTTOM_LOAD_STATUS;

export default class CommonListView {
  @observable public listData = new ListView.DataSource({
    rowHasChanged: (row1: any,row2:any) => row1 !== row2
  })
  @observable public listFooterStatus:number = LOADING;

  @action.bound
  public setListFooterStatus(status: number):void {
    this.listFooterStatus = status;
  }

  @action.bound
  public async requestListData(api:any, params: any) {
    try{
      const {data} = await api({...params});
      this.listData = this.listData.cloneWithRows(data.list);
    } catch(e) {
      console.log(e)
    }
  }

}