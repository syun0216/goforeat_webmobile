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
    background: 'transparent'
  }
}

interface IListFooter{
  loadingStatus: number,
  errorToDo: () => void
}

const listFooter = ({loadingStatus, errorToDo}: IListFooter) => {
  switch(loadingStatus) {
    case BOTTOM_LOAD_STATUS.LOADING: 
      return (
        <div style={styles.listFooterContainer}>
          <ActivityIndicator text="Loading..."/>
        </div>
      )
    case BOTTOM_LOAD_STATUS.LOAD_FAILED: 
      return (
        <Button style={styles.listFooterContainer} onClick={errorToDo}>
          加載失敗,請點擊重試...
        </Button>
      )
    case BOTTOM_LOAD_STATUS.NO_MORE_DATA: 
      return (
        <div style={styles.listFooterContainer}>
          已全部加載完畢
        </div>
      )
    default: return null
  }
}

export default listFooter;