import React, { Component } from "react";
import { ActivityIndicator } from "antd-mobile";
import { inject, observer } from "mobx-react";
//components
import MyLoader from "../MyLoader";
import CommonHeader from "../CommonHeader";
import BlankPage from "../BlankPage";
//styles
import "./BasicHOC.less";
//utils
import { getDeviceInfo } from "../../utils/common";
//router
import { CRI } from "../../router/customRouteInterceptors";
//interface
import { IBasic } from "../../interfaces/index";

const basicStyles = {
  loadingItem: {
    padding: "10px",
    marginTop: "4em"
  }
};

const hasNoCommonHeader = ["/login", "/editInfo"];
const hasNoDownloadInfo = ["/login", "/content", "/confirmorder"];

const basicHOC = (WarppedComponent: any) => {
  @inject("basicMobx")
  @observer
  class BasicComponent extends Component<IBasic, any> {
    public componentDidMount() {
      const { pathname } = this.props.location;
      const { setDownload, setLoading } = this.props.basicMobx;
      //自定義路由攔截器
      CRI(this.props.history);
      //--------
      this.goSchema();
      setDownload(
        hasNoDownloadInfo.indexOf(pathname) === -1 &&
          !sessionStorage.getItem("GFEdownload")
      );
      setLoading(hasNoCommonHeader.indexOf(pathname) === -1);
    }

    public componentDidCatch(error: Error, info: any) {
      this.setState({ error });
      // this.showToast("fail", "出错了...");
      // console.log(123, error);
    }

    public render() {
      const { pageLoading, showDownload } = this.props.basicMobx;
      const {
        location: { pathname }
      } = this.props;
      return (
        <div
          className={`${
            hasNoCommonHeader.indexOf(pathname) === -1 ? "app" : null
          }`}
        >
          {showDownload ? this._renderDownload() : null}
          {pageLoading ? this._renderIndicator() : null}
          {this._renderEnhancePropsWarppedComponent()}
        </div>
      );
    }

    //logic functions
    public goSchema = () => {
      if (sessionStorage.getItem("GFEschema")) {
        return;
      }
      if (getDeviceInfo() === "ios") {
        window.location.href = "fb2036279879923166://" || "goforeat://";
      } else if (getDeviceInfo() === "android") {
        return;
      }
      sessionStorage.setItem("GFEschema", "1");
    };

    //render functions
    private _renderDownload() {
      const { closeDownload } = this.props.basicMobx;
      return (
        <div className="download-container">
          <div className="close" onClick={closeDownload}>
            <span className="close-img" />
          </div>
          <div className="content">
            <i className="icon" />
            <section className="section">
              <div className="titletips">下載有得食app</div>
              <div className="subtitle">新人立享$30優惠券</div>
            </section>
            <div
              className="btn"
              onClick={() => {
                const _device = getDeviceInfo();
                if (_device === "ios") {
                  window.open(
                    "https://itunes.apple.com/cn/app/goforeat/id1343559475?mt=8",
                    "_blank"
                  );
                } else if (_device === "android") {
                  window.open(
                    "https://play.google.com/store/apps/details?id=com.goforeat_app",
                    "_blank"
                  );
                }
              }}
            >
              立即下載
            </div>
          </div>
        </div>
      );
    }

    private _renderIndicator() {
      return (
        <div className="loader">
          <CommonHeader>
            <ActivityIndicator size="small" panelColor="white" />
          </CommonHeader>
          <div style={basicStyles.loadingItem}>
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
          </div>
        </div>
      );
    }

    private _renderEnhancePropsWarppedComponent() {
      const {
        hidePageLoading,
        showLoading,
        showRequesting,
        hideReqesting,
        showToast
      } = this.props.basicMobx;
      return (
        <WarppedComponent
          hideLoading={hidePageLoading}
          showLoading={showLoading}
          showRequesting={showRequesting}
          hideRequesting={hideReqesting}
          showToast={showToast}
          {...this.props}
        />
      );
    }
  }
  return BasicComponent;
};
export default basicHOC;
