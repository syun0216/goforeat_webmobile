import { observable, action, computed } from 'mobx';
//api
import { getCode, checkCode } from '../api/request';
//api interface

// antd-mobile
import { ActionSheet, Toast } from 'antd-mobile';

export default class LoginMobx {

@observable public BUTTONS = ['HK +852', 'CHN +86'];

@observable public type: number = this.BUTTONS.indexOf('HK +852')
// type 手机类型 HK: 1 CHN: 2

@observable public mobile: string = ''

@observable public code: string = ''

@observable public n: number = 60; //倒計時的秒數

private loginToken: string = ''

private interval: any;

@action.bound
public async getCode() {
    try {
        const result = await getCode(this.mobile, this.type + 1);
        if(result.data!.token) {
            Toast.info('驗證碼發送成功', 1);
            this.loginToken = result.data.token;
            localStorage.setItem('login-token', result.data.token);
            this.interval = setInterval(() => {
                this.n = this.n - 1
                if(this.n === 0) {
                    clearInterval(this.interval)
                    this.n = 60
                }
            }, 1000)
        } else {
            Toast.info('驗證碼發送失敗', 1);
        }
    } catch (error) {
        console.log(error);
        Toast.info('驗證碼發送失敗', 1);
    }
}

@action.bound
public async login() {
    try {
        const result = await checkCode(
            this.mobile,
            this.type,
            this.loginToken,
            this.code
        )
        if(result.data!) {
            localStorage.setItem('userInfo', result.data)
            Toast.info('登錄成功', 1);
        } else {
            Toast.info('登錄失敗，請稍後再試', 1);
        }
    } catch (error) {
        console.log(error);
        Toast.info('登錄失敗，請稍後再試', 1);
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

@action.bound
public setCode(code: string) {
    this.code = code
}

@computed
public get sendCode(): string {
    if(this.n === 60) {
        return '點擊發送'
    } else {
        return `${this.n}秒后重新發送`
    }
}

}