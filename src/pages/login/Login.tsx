import * as React from 'react';
import { Link } from 'react-router-dom';
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
export default class Login extends React.Component<ILogin, {}> {

  constructor(props: ILogin) {
    super(props)
  }

  public componentDidMount() {
    this.props.hideLoading();
  }

  // public inputOnChange(e: any):void {
  //   const { setMobile } = this.props.LoginMobx;
  //   setMobile(e.target.value)
  // }

  public render() {
    const { getCode, showActionSheet, type, mobile, BUTTONS, setMobile, login, code, setCode, sendCode } = this.props.LoginMobx;
    return (
      <div>
        <div className="title" style={styles.title}>
          <Link to="/">
            <i className="fas fa-angle-left title-top-left fa-2x" />
          </Link>
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
                <span className="main-container-input-text" onClick={() => showActionSheet()}>
                  {BUTTONS[type]}
                </span>
                <i className="fas fa-angle-down main-container-arrow" />
                <input type="text" placeholder="請輸入手機號" className="main-container-transparent" defaultValue={mobile} onChange={e => {setMobile(e.target.value)}}/>
              </div>
              <div className="main-container-input">
                {GenerateIcon(password, 'phone', 'main-container-icon')}
                <input type="text" placeholder="請輸入驗證碼" className="main-container-transparent" defaultValue={code} onChange={e => {setCode(e.target.value)}}/>
                <div className="validate-code" onClick={() => getCode()}>
                  <span>
                    {sendCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="main-button-area">
              <div className="main-button">
                <span className="main-button-text" onClick={() => {
                  login(() => {
                    const { history,history: {location: {state}} } = this.props;
                    state.from ? history.replace(state.from.pathname,{params: state.from.state.params || null}) :
                    history.push('/'); // 回调函数，返回到首页
                  })
                }}>登入/註冊</span>
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