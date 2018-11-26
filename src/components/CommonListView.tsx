import React, { ReactText } from "react";
import { ListView } from "antd-mobile";
//mobx
import { observer, inject } from "mobx-react";
//components
import Divider from "./Divider";
import ListFooter from "./ListFooter";
import BlankPage from "./BlankPage";
//utils
import { BOTTOM_LOAD_STATUS } from "../utils/global_params";
import { isEmpty } from "../utils/common";
import {errHandler} from "../utils/requestHandler";
//interface
import { ICommonListView } from "../interfaces";

const {
  LOADING,
  LOAD_FAILED,
  LOAD_SUCCESS,
  NO_DATA,
  NO_MORE_DATA
} = BOTTOM_LOAD_STATUS;

interface ICList extends ICommonListView {
  requestFunc: any;
  extraParams?: any;
  renderItem: any;
  renderHeader?: any;
  isItemSeparatorShow: boolean;
  separatorColor?: string;
  separatorHeight?: number;
  style?: {};
}

const requestParams = {
  nextOffset: 0,
  currentOffset: 0
};

@inject("commonListViewMobx")
@observer
export default class CommonListView extends React.Component<ICList, {}> {
  private timer: any = null;
  private listView: any;
  private offset:number = 5;

  constructor(props: ICList) {
    super(props);
    this.init();
  }

  public componentDidMount() {
    this.init();
    this._requestFirstPage();
  }

  public componentWillUnmount() {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
  }

  public render() {
    const { listDataRawArr, listFooterStatus }: any = this.props.commonListViewMobx;
    return (
      listDataRawArr.length === 0 && listFooterStatus === NO_DATA ?  <BlankPage message="暫無數據"/> : this._renderCommonListView()
    );
  }

  //public
  public init() {
    requestParams.nextOffset = 0;
    requestParams.currentOffset = 0;
  }

  public getListData(
    offset: number,
    successCallback: (val: any) => void,
    failCallback: () => void
  ) {
    const { requestFunc, extraParams = {} } = this.props;
    let _requestParams = {
      offset
    };
    if (Object.keys(extraParams).length > 0) {
      _requestParams = Object.assign(_requestParams, extraParams);
    }
    requestFunc({..._requestParams}).then(
      (data: any) => {
        if (data.ro.ok) {
          successCallback(data.data.list || []);
        } else {
          errHandler(data.ro);
        }
      },
      () => {
        if (typeof failCallback !== undefined) {
          failCallback();
        }
      }
    ).catch((e: Error) => errHandler(e));
  }

  public outsideRefresh = () => {
    this.init();
    this._requestFirstPage();
  }

  //private
  private _renderHeader = () => {
    const { renderHeader }: any = this.props;
    if (isEmpty(renderHeader)) {
      return null;
    }
    return renderHeader();
  }

  private _renderItemDivider = (sectionID: ReactText, rowID: ReactText): any => {
    const { isItemSeparatorShow, separatorColor } = this.props;
    if (!isItemSeparatorShow) {
      return null;
    }
    return <Divider key={rowID} bgColor={separatorColor || "transparent"} height="10px" />;
  }

  private _renderCommonListItemView = (
    rowData: any,
    sectionID: ReactText,
    rowID: ReactText
  ) => {
    if (this.props.renderItem) {
      return this.props.renderItem(rowData, sectionID, rowID);
    }
    return <div>{rowID}</div>;
  }

  private _renderCommonListView() {
    const { listData, listFooterStatus }: any = this.props.commonListViewMobx;
    return (
      <ListView
        ref={el => (this.listView = el)}
        className="food-list-view"
        dataSource={listData}
        pageSize={5}
        useBodyScroll
        // onScroll={() => {
        //   console.log("scroll");
        // }}
        renderHeader={this._renderHeader}
        renderRow={this._renderCommonListItemView}
        renderFooter={() => (
          <ListFooter
            loadingStatus={listFooterStatus}
            errorToDo={() => this._onErrorToRequestNextPage()}
          />
        )}
        onEndReachedThreshold={10}
        onEndReached={this._onEndReach}
        renderSeparator={this._renderItemDivider}
      />
    );
  }

  private _requestFirstPage() {
    const {
      setListData,
      setListFooterStatus
    }: any = this.props.commonListViewMobx;
    this.getListData(
      requestParams.nextOffset,
      data => {
        if (data.length === 0) {
          setListFooterStatus(NO_MORE_DATA);
          setListData(data);
          return;
        }
        setListFooterStatus(LOAD_SUCCESS);
        setListData(data);
      },
      () => {
        // console.log("err");
      }
    );
  }

  private _requestNextPage() {
    const { listData,concatListData,
      setListFooterStatus }: any = this.props.commonListViewMobx;
    this.getListData(requestParams.nextOffset, data => {
      if(data.length === 0) {
        requestParams.nextOffset = requestParams.currentOffset;
        setListFooterStatus(NO_MORE_DATA);
        concatListData(data);
        return;
      }
      setListFooterStatus(LOADING);
      concatListData(data);
      requestParams.currentOffset = requestParams.nextOffset;
    },() => {
      console.log('err');
    });
  }

  private _onRefreshToRequestFirstPageData() {
    console.log(123);
  }

  private _onErrorRequestFirstPage() {
    console.log(1234);
  }

  private _onErrorToRequestNextPage() {
    console.log(12345);
  }

  private _onEndReach = () => {
    const { listFooterStatus }: any = this.props.commonListViewMobx;
    requestParams.nextOffset += this.offset;
    if(listFooterStatus === NO_MORE_DATA){ return;}
    this._requestNextPage();
  }
}
