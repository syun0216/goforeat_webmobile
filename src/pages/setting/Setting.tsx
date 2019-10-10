import React, {Component} from 'react';
//components
import CommonHeader from "../../components/CommonHeader";


export default class Setting extends Component{

  public render() {
    return (
      <section className="setting-container">
        {this._renderHeader()}
      </section>
    )
  }

  private _renderHeader() {
    return (
      <CommonHeader canBack>
        <span className="title">系統設置</span>
      </CommonHeader>
    )
  }
}