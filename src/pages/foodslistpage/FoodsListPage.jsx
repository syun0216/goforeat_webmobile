import React, { PureComponent } from 'react'
//api
import { getArticleList } from '@/api/request';
//components
import CommonHeader from '@/components/CommonHeader';
//style
import './FoodsListPage.less';

export default class FoodsListPage extends PureComponent {
  render() {
    return (
      <div>
        <CommonHeader>本週菜品</CommonHeader>
        foodsListPage
      </div>
    )
  }
}
