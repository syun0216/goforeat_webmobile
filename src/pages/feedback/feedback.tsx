import React, { Component } from 'react';
//components
import CommonHeader from '../../components/CommonHeader';
import CommonBottomBtn from '../../components/CommonBottomBtn/CommonBottomBtn';
//styles
import './feedback.less';

export default class Feedback extends Component{


  public render() {
    return (
      <div className="feedback-container">
        <CommonHeader canBack>
          <span className="title">
            用戶反饋
          </span>
        </CommonHeader>
        <textarea placeholder="請留下您的寶貴意見和建議,我們將努力改進(不少於5個字)"/>
        <input type="text" placeholder="請填寫您的手機號(非必填)"/>
        <CommonBottomBtn clickFunc={() => console.log(123)} text="提交"/>
      </div>
    )
  }

}