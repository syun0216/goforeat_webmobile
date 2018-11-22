import { observable, action } from "mobx";
import { Toast } from "antd-mobile";
import { IUser } from "../interfaces/server";

export default class Basic {
  @observable
  public bottomLoadingStatus: boolean;
  @observable
  public user: IUser;
  @observable 
  public values: {
    pageLoading: true,
    postRequesting: false
  }

  @observable public foodDetailValues = {
    selectedTab: 'Daily',
    foodCount: 1
  }
  

  @action.bound
  public errorHandler(err: any) {
    console.log(err);
  }

  /**
   *
   *
   * @param {string} [message='hello']
   * @param {string} [type="info"] "success" "fail" "offline" "loading"
   * @param {number} [duration=2]
   * @memberof Basic
   */
  @action
  public showToast(
    message: string = "hello",
    type: string = "info",
    duration: number = 2
  ) {
    Toast[type](message, duration);
  }

  @action
  public hideToast() {
    Toast.hide();
  }
}
