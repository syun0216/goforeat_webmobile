import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
//utils
// import { isAuth } from '@/utils/auth';

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({component});
    }

    render() {
      const C = this.state.component;
      console.log(this.state.component);

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}