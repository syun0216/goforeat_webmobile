import React from 'react';
import { ListView } from 'antd-mobile';
import Divider from './Divider';
//utils
import { BOTTOM_LOAD_STATUS } from '../utils/global_params';

interface ICommonListView {
  requestFunc: () => {},
  renderItem: () => {},
  isItemSeparatorShow: boolean,
  style: {}
}

export default class CommonListView extends React.Component<ICommonListView,{}> {
  
}