import React, { Component } from "react";
import { ActivityIndicator, Toast } from "antd-mobile";
import { inject } from "mobx-react";
//components
import MyLoader from "../MyLoader";
import CommonHeader from "../CommonHeader";
import BlankPage from "../BlankPage";
//styles
import "./BasicHOC.less";
//utils
import { getDeviceInfo } from "../../utils/common";
//router
import { CRI } from '../../router/customRouteInterceptors';

const basicStyles = {
  loadingItem: {
    padding: "10px"
  }
};

const hasNoCommonHeader = ["/login", "/content", "/confirmorder","/editInfo"];

const basicHOC = (WarppedComponent: typeof Component) =>
  class extends Component<any, any> {
    public state = {
      pageLoading: false,
      showModal: false,
      showDownload: true,
      error: null
    };

    public componentDidMount() {
      const { pathname } = this.props.location;
      //自定義路由攔截器
      CRI(this.props.history);
      //--------
      this.goSchema();
      this.setState({
        showDownload:
          hasNoCommonHeader.indexOf(pathname) === -1 &&
          !sessionStorage.getItem("GFEdownload"),
        pageLoading: hasNoCommonHeader.indexOf(pathname) === -1
      });
    }

    public componentDidCatch(error: Error, info: any) {
      this.setState({ error });
      this.showToast("fail", "出错了...");
      // console.log(123, error);
    }

    public render() {
      const { pageLoading, showDownload } = this.state;
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
      if(sessionStorage.getItem('GFEschema')) {
        return;
      }
      if(getDeviceInfo() === 'ios') {
        window.location.href = "fb2036279879923166://" || "goforeat://";
      } else if(getDeviceInfo() === 'android') {
        return ;
      }
      sessionStorage.setItem("GFEschema", "1");
    }

    public showLoading = () => {
      this.setState({
        pageLoading: true
      });
    };

    public hidePageLoading = () => {
      this.setState({
        pageLoading: false
      });
    };

    public showRequesting = () => {
      Toast.loading("requesting", 0);
    };

    public hideReqesting = () => {
      Toast.hide();
    };

    public showToast = (type: string = "info", content = "Goforeat") => {
      const duration = 3;
      Toast[type](content, duration);
    };

    public toggleModal = (status: boolean = true) => {
      this.setState({
        showModal: status
      });
    };

    public closeDownload = () => {
      this.setState(
        {
          showDownload: false
        },
        () => {
          sessionStorage.setItem("GFEdownload", "1");
        }
      );
    };

    //render functions
    private _renderDownload() {
      return (
        <div className="download-container">
          <div className="close" onClick={this.closeDownload}>
            <span className="close-img" />
          </div>
          <div className="content">
            <i className="icon" />
            <section className="section">
              <div className="titletips">下載有得食app</div>
              <div className="subtitle">新人立享$20優惠券</div>
            </section>
            <div
              className="btn"
              onClick={() =>
                window.open("http://api.goforeat.hk/guide/download", "_blank")
              }
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
            <ActivityIndicator size="small" />
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
      return (
        <WarppedComponent
          hideLoading={this.hidePageLoading}
          showLoading={this.showLoading}
          showRequesting={this.showRequesting}
          hideRequesting={this.hideReqesting}
          showToast={this.showToast}
          toggleModal={this.toggleModal}
          {...this.props}
        />
      );
    }
  };

export default basicHOC;
