import * as React from 'react';

interface State {
  component: typeof React.Component | null
}

const initialState = {
  component: null
}

export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component<any, State> {
    public state: State = initialState;
    constructor(props: any) {
      super(props);
    }

    public async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({component});
    };

    public render() {
      const C = this.state.component;
  
      return C ? <C {...this.props}/> : null
    }
    
  }
  return AsyncComponent;
}