import React, { PureComponent } from 'react'
import './MyOrderPage.less';
//api
//components
import CommonHeader from '@/components/CommonHeader';

export default class MyOrderPage extends PureComponent {
  render() {
    return (
      <div className="myorder-container">
        <CommonHeader canBack>
          <span>我的訂單</span>
        </CommonHeader>
      </div>
    )
  }
}