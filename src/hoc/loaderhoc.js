import React, { Component } from 'react';
import { ActivityIndicator } from 'antd-mobile';


const LoaderHOC = (propsName) => (WarppedComponent) => {
  return class LoaderHOC extends Component{

    isEmpty(value) {
      return (
        value === null ||
        value === undefined ||
        (value.hasOwnProperty('length') && value.length === 0) ||
        (value.constructor === Object && Object.keys(value).length === 0)
      )
    }

    render() {
      console.log(this.props);
      const LOADING = (<ActivityIndicator
        toast
        text="Loading..."
      />);
      return this.isEmpty(this.state[propsName]) ? LOADING : <WarppedComponent /> 
    }
  }
}

export default LoaderHOC;