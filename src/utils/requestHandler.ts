import { observable, set } from "mobx";
import rootStore from "../mobx/rootStore";
import { removeToken, removeCustomCookie } from "./auth";

export function successHandler(callback: () => void) {
  const _basicMobx = rootStore.basicMobx;
  _basicMobx.pageLoading && set(_basicMobx, "pageLoading", false);
  callback && callback();
}

export function errHandler(err: Error | any) {
  const _basicMobx = rootStore.basicMobx;
  set(_basicMobx, "pageLoading", false);
  if (Object.prototype.toString.call(err) === "[object Error]") {
    _basicMobx.showToast("fail", "網絡請求出錯了");
    set(_basicMobx, "isError", true);
  } else {
    if (err && err.respCode) {
      console.log(err);
      _basicMobx.showToast("fail", err.respMsg);
      if (err.respCode === "10006" || err.respCode === "10007") {
        removeToken();
        removeCustomCookie("userInfo");
        window.location.href = "/";
      }
    }
  }
}
