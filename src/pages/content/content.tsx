import React from 'react';
//components
import CommonHeader from '../../components/CommonHeader';
//styles
import './content.less';

const ContentPage = ({history: {location: {state: {data: {title, url}}}}}: any) => {
  // console.log(data);
  return (
    <div className="content-container">
      <CommonHeader canBack><span>{title}</span></CommonHeader>
      <iframe src={url} title="content"/>
    </div>
  )
}

export default ContentPage;