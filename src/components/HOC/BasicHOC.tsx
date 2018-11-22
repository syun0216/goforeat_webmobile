import React, {Component} from 'react';
import { ActivityIndicator, Toast } from 'antd-mobile';
import { inject } from 'mobx-react';
//components
import MyLoader from '../MyLoader';
import CommonHeader from '../CommonHeader';
import BlankPage from '../BlankPage';

const basicStyles = {
  loadingItem: {
    padding: '10px'
  }
};

const hasNoCommonHeader = ['/login'];

const basicHOC = (WarppedComponent: typeof Component) => 
class extends Component<any, any> {
  public state = {
    pageLoading: true,
    showModal: false,
    error: null
  }

  public componentDidMount() {
    console.log(this.props);
  }

  public componentDidCatch(error:Error, info:any) {
    this.setState({error});
    console.log(123,error);
  }

  public render() {
    const { pageLoading, showModal } = this.state;
    const { location: { pathname } } = this.props;
    return (
      <div className={`${hasNoCommonHeader.indexOf(pathname) === -1 ? 'app' : null}`}>
        { showModal ? this._renderShadeModal() : null }
        { pageLoading ? this._renderIndicator() : null}
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

  //render functions
  private _renderIndicator() {
    return (
      <div>
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