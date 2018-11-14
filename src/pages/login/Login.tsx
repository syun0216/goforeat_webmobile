import * as React from 'react';
import { ActionSheet } from 'antd-mobile';
import "./Login.less"
import GenerateIcon from '../../components/GenerateIcon';
// import images
const loginBg = require('@/assets/login_bg.png');
const logoTop = require('@/assets/logoTop.png');
const phone = require('@/assets/phone.png');
const password = require('@/assets/password.png');



const styles = {
  title: {
    backgroundImage: 'url(' + loginBg + ')',
    backgroundSize: '100%'
  }
}

export default class Login extends React.PureComponent{

  public render() {
    return (
      <div>
        <div className="title" style={styles.title}>
          {GenerateIcon(logoTop, 'logoTop', 'title-logo-top')}          
        </div>
        <div className="main">
          <div className="main-container">
            <div className="main-container-title">
              <span>手機號登入</span>
            </div>
            <div className="main-container-input-group">
              <div className="main-container-input">
                {GenerateIcon(phone, 'phone', 'main-container-icon')}
                <span className="main-container-input-text">
                  HK+852
                </span>
                <i className="fas fa-angle-down main-container-arrow" />
              </div>
              <div className="main-container-input">
                {GenerateIcon(password, 'phone', 'main-container-icon')}
              </div>
            </div>
          </div>
          <div className="main-button-area">
              <div className="main-button">
                <span className="main-button-text">登入/註冊</span>
              </div>
          </div>
        </div>
        <div className="share">
          <div className="share-text"> 
            <span>或</span>
          </div>
          <div className="share-logo-group">
            {GenerateIcon(logoTop, 'facebook', 'share-logo')}
            {GenerateIcon(logoTop, 'wechat', 'share-logo')}
          </div>
        </div>
      </div>
    )
  }

}