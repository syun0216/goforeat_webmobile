import { observable, action, decorate } from "mobx";
import { Toast } from "antd-mobile";
import { IUser } from "../interfaces/server";

class BasicMobx {
  public userInfo = {};
  public pageLoading: boolean = false;
  public showModal: boolean = false;
  public showDownload: boolean = true;
  public isError: boolean = false;
  public errorMessage: string = '';

  public setLoading = (status: boolean) => {
    this.pageLoading = status;
  }

  public showLoading = () => {
    this.pageLoading = true;
  };

  public hidePageLoading = () => {
    this.pageLoading = false;
  };

  public setDownload = (status: boolean) => {
    this.showDownload = status;
  }

  public closeDownload = () => {
    this.showDownload = false;
    sessionStorage.setItem("GFEdownload", "1");
  };

  public showRequesting = () => {
    Toast.loading("requesting", 0);
  };

  public hideReqesting = () => {
    Toast.hide();
  };

  public showToast = (type: string = "info", content = "Goforeat") => {
    const duration = 2;
    Toast[type](content, duration);
  };

}

decorate(BasicMobx, {
  pageLoading: observable,
  showModal: observable,
  showDownload: observable,
  setLoading: action,
  showLoading: action,
  closeDownload: action,
  setDownload: action
})

export default BasicMobx;


