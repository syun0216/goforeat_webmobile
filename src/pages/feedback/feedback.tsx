import React, { Component } from 'react';
//interface
import { IBasic } from "../../interfaces/index";
//api
import { feedback } from "../../api/request";
//mobx
import { observer, inject } from "mobx-react";
//components
import CommonHeader from '../../components/CommonHeader';
import CommonBottomBtn from '../../components/CommonBottomBtn/CommonBottomBtn';
//styles
import './feedback.less';
//utils
import { getToken } from '../../utils/auth';

@inject("basicMobx")
@observer
export default class Feedback extends Component<IBasic, {}>{

  private memberInfo = '';
  private content = '';

  public render() {
    
    return (
      <div className="feedback-container">
        <CommonHeader canBack>
          <span className="title">
            用戶反饋
          </span>
        </CommonHeader>
        <textarea onChange={e => this._getContent(e.target.value)} placeholder="請留下您的寶貴意見和建議,我們將努力改進(不少於5個字)"/>
        <input onChange={e => this._getMemberInfo(e.target.value)} type="text" placeholder="請填寫您的手機號(非必填)"/>
        <CommonBottomBtn clickFunc={() => this.postFeedback()} text="提交"/>
      </div>
    )
  }

  //api
  private postFeedback = async () => {
    const { showRequesting, hideReqesting, showToast } = this.props.basicMobx;
    if(this.content === '' && this.content.length <= 5) {
      showToast("info", '請輸入不少於5個字');
      return;
    }
    showRequesting('提交中...');
    try{
      const res: any = await feedback({content: this.content, memberInfo: this.memberInfo,sid: getToken()});
      hideReqesting();
      if(res.ro) {
        showToast("info", '提交成功');
        console.log(res);
      }
    } catch(e) {
      hideReqesting();
      console.log(e);
    }
  }

  private _getMemberInfo = (text: string) => {
    this.memberInfo = text;
  }

  private _getContent = (text: string ) => {
    this.content = text;
  }

  

}