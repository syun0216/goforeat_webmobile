import React from 'react';
import { Button } from 'antd-mobile';
import CommonHeader from '../components/CommonHeader';

const notFound = (props:any) => {
  props.hideLoading()
  return (
  <div>
    <CommonHeader>
      <span>Not found</span>
    </CommonHeader>
      <p style={{textAlign: 'center'}}>該鏈接無效</p>
      <Button onClick={() => props.history.replace('/')}>返回首頁</Button>
  </div>
)}

export default notFound;