import React from 'react';
//components
import CommonHeader from '../../components/CommonHeader';
//styles
import './content.less';
//utils
import { isEmpty } from '../../utils/common';

const ContentPage = (props: any) => {
  // console.log(data);
  console.log(123,props);
  const {url, title} = props.location.state;
  return (
    <div className="content-container">
      <CommonHeader canBack><span>{title}</span></CommonHeader>
      { !isEmpty(url) ? <iframe src={url} title="content"/> : null }
    </div>
  )
}

export default ContentPage;