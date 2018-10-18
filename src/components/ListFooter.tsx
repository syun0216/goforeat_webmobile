import React from 'react';
import { ActivityIndicator, Button } from 'antd-mobile';
//utils
import { BOTTOM_LOAD_STATUS } from '../utils/global_params';

const styles = {
  listFooterContainer: {
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

interface IListFooter{
  loadingStatus: number,
  errorToDo: () => {}
}

const listFooter = ({loadingStatus, errorToDo}: IListFooter) => {
  switch(loadingStatus) {
    case BOTTOM_LOAD_STATUS.LOADING: 
      return (
        <div className="list-footer-container">
          <ActivityIndicator text="Loading..."/>
        </div>
      )
    case BOTTOM_LOAD_STATUS.LOAD_FAILED: 
      return (
        <Button className="list-footer-container" onClick={errorToDo}>
          加載失敗,請點擊重試...
        </Button>
      )
    case BOTTOM_LOAD_STATUS.NO_MORE_DATA: 
      return (
        <div className="list-footer-container">
          已全部加載完畢
        </div>
      )
    default: return null
  }
}

export default listFooter;