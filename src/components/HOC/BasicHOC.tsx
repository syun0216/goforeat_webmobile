import React, {Component} from 'react';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { inject } from 'mobx-react';
//components
import MyLoader from '../MyLoader';
import CommonHeader from '../CommonHeader';
import BlankPage from '../BlankPage';
//styles
import './BasicHOC.less';

const basicStyles = {
  loadingItem: {
    padding: '10px'
  }
};

const hasNoCommonHeader = ['/login','/content'];

const basicHOC = (WarppedComponent: typeof Component) => 
class extends Component<any, any> {
  public state = {
    pageLoading: false,
    showModal: false,
    showDownload: true,
    error: null
  }

  public componentDidMount() {
    const { pathname } = this.props.location;
    this.setState({
      showDownload: hasNoCommonHeader.indexOf(pathname) === -1 && !sessionStorage.getItem('GFEdownload'),
      pageLoading: hasNoCommonHeader.indexOf(pathname) === -1
    })
  }

  public componentDidCatch(error:Error, info:any) {
    this.setState({error});
    this.showToast('danger','出错了...');
    console.log(123,error);
  }

  public render() {
    const { pageLoading, showModal, showDownload } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <div className={`${hasNoCommonHeader.indexOf(pathname) === -1 ? 'app' : null}`}>
        { showModal ? this._renderShadeModal() : null }
        { showDownload ? this._renderDownload() : null }
        { pageLoading ? this._renderIndicator() : null }

        { this._renderEnhancePropsWarppedComponent() }
      </div>
    )
  }

  //logic functions
  private showLoading = () => {
    this.setState({
      pageLoading: true
    })
  }

  private hidePageLoading = () => {
    this.setState({
      pageLoading: false
    })
  }

  private showRequesting = () => {
    Toast.loading('requesting',0)
  }

  private hideReqesting = () => {
    Toast.hide();
  }

  private showToast = (type:string = 'info', content='Goforeat') => {
    const duration = 3;
    Toast[type](content, duration);
  }

  private toggleModal = (status:boolean = true) => {
    this.setState({
      showModal: status
    })
  }

  private closeDownload = () => {
    this.setState({
      showDownload: false
    }, () => {
      sessionStorage.setItem('GFEdownload', '1');
    })
  }

  //render functions
  private _renderDownload() {
    return (
      <div className="download-container">
        <div className="close" onClick={this.closeDownload}><span className="close-img"/></div>
        <div className="content">
          <i className="icon" />
          <section className="section">
            <div className="titletips">下載有得食app</div>
            <div className="subtitle">新人立享$20優惠券</div>
          </section>
          <div className="btn" onClick={() => window.open("http://api.goforeat.hk/guide/download","_blank")}>立即下載</div>
        </div>
      </div>
    )
  }

  private _renderIndicator() {
    return (
      <div className="loader">
        <CommonHeader>
          <ActivityIndicator size="small"/>
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
    )
  }

  private _renderShadeModal() {
    return (
      <div className="am-drawer-overlay" onClick={() => this.toggleModal(false)} style={{opacity: 0.4,zIndex: 10,visibility:'visible'}}/>
    )
  }

  private _renderEnhancePropsWarppedComponent() {
    return (<WarppedComponent 
    hideLoading={this.hidePageLoading}
    showLoading={this.showLoading} 
    showRequesting={this.showRequesting}
    hideRequesting={this.hideReqesting} 
    showToast={this.showToast}
    toggleModal={this.toggleModal} {...this.props}/>)
  }
}

export default basicHOC;