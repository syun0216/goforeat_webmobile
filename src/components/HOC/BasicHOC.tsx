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

const basicHOC = (WarppedComponent: typeof Component) => 
class extends Component<any, any> {
  public state = {
    pageLoading: true,
  }

  public componentDidMount() {
    console.log(999, this.props);
  }

  public render() {
    const { pageLoading } = this.state;
    return (
      <div className="app">
        { pageLoading ? this._renderIndicator() : null}
        { this._renderEnhancePropsWarppedComponent() }
      </div>
    )
  }

  //logic functions
  private hidePageLoading = () => {
    this.setState({
      pageLoading: false
    })
  }

  private showRequesting = () => {
    this.setState({
      postRequesting: true
    })
  }

  private hideReqesting = () => {
    this.setState({
      postRequesting: false
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

  private _renderEnhancePropsWarppedComponent() {
    return <WarppedComponent hideLoading={this.hidePageLoading} showRequesting={this.showRequesting} hideRequesting={this.hideReqesting} {...this.props}/>
  }
}

export default basicHOC;