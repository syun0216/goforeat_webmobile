import { observable, action, computed } from 'mobx';
//api
import { getCode } from '../api/request';
//api interface
import { ILoginInfo } from '../interfaces/server';
// antd-mobile
import { ActionSheet } from 'antd-mobile';

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: (e: any) => e.preventDefault(),
  };
}


export default class LoginMobx {

@observable public BUTTONS = ['HK +852', 'CHN +86'];

@observable public type: number = this.BUTTONS.indexOf('HK +852')
// type 手机类型 HK: 1 CHN: 2

@observable public mobile: string

@observable public loginInfo: ILoginInfo = {
    phoneNumer: 0,
    validateCode: 0
}

@action.bound
public async getCode(mobile: string, type: number) {
    const code = await getCode(mobile, type);
    console.log(code)
}

@action.bound
public showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
        options: this.BUTTONS,
        cancelButtonIndex: this.BUTTONS.length - 1,
        message: '選擇電話類型',
        maskClosable: true,
    }, buttonIndex => {
        this.type = buttonIndex + 1
    })
}


}