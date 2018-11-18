import * as React from 'react';
//style
import "./Login.less"

import {ILogin} from '../../interfaces';
import GenerateIcon from '../../components/GenerateIcon';
// mobx
import { observer, inject } from 'mobx-react';


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
@inject("basicMobx")
@inject("LoginMobx")
@observer
export default class Login extends React.PureComponent<ILogin, {}> {

  constructor(props: ILogin) {
    super(props)
  }

  // public async componentDidMount() {
  //   const { getCode } = this.props.LoginMobx;
  // }

  public render() {
    const { getCode, showActionSheet, type, mobile, BUTTONS } = this.props.LoginMobx;
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
                <span className="main-container-input-text" onClick={() => showActionSheet}>
                  {BUTTONS[type]}
                </span>
                <i className="fas fa-angle-down main-container-arrow" />
                <input type="text" placeholder="請輸入手機號" className="main-container-transparent" value={mobile}/>
              </div>
              <div className="main-container-input">
                {GenerateIcon(password, 'phone', 'main-container-icon')}
                <input type="text" placeholder="請輸入驗證碼" className="main-container-transparent"/>
                <div className="validate-code" onClick={() => getCode(mobile, type)}>
                  <span>
                    點擊發送
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="main-button-area">
              <div className="main-button">
                <span className="main-button-text">登入/註冊</span>
              </div>
          </div>
        </div>
        {/* <div className="share">
          <div className="share-text"> 
            <span>或</span>
          </div>
          <div className="share-logo-group">
            {GenerateIcon(logoTop, 'facebook', 'share-logo')}
            {GenerateIcon(logoTop, 'wechat', 'share-logo')}
          </div>
        </div> */}
      </div>
    )
  }

}