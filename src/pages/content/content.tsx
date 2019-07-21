import React from 'react';
//components
import CommonHeader from '../../components/CommonHeader';
//styles
import './content.less';
//utils
import { isEmpty } from '../../utils/common';

const ContentPage = (props: any) => {
  // console.log(data);
  const {url, title} = props.location.state;
  props.hideLoading();
  return (
    <div className="content-container">
      <CommonHeader canBack><span className="title">{title}</span></CommonHeader>
      { !isEmpty(url) ? <iframe src={url} title="content"/> : null }
    </div>
  )
}

export default ContentPage;