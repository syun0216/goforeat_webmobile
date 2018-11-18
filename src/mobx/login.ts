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

@observable public mobile: string = ''

@action.bound
public async getCode() {
    console.log(this.mobile)
    try {
        const code = await getCode(this.mobile, this.type);
        console.log(code)
    } catch (error) {
        console.log(error)
    }
}

@action.bound
public showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
        options: this.BUTTONS,
        cancelButtonIndex: this.BUTTONS.length - 1,
        message: '選擇電話類型',
        maskClosable: true,
    }, buttonIndex => {
        this.type = buttonIndex
    })
}

@action.bound
public setMobile(mobile: string) {
    this.mobile = mobile
}


}