import React, { Component } from 'react';
import Route from '@/router';
import {hot} from 'react-hot-loader';
import '@/styles/transition.less';
import '@/styles/index.less';

@hot(module)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Route />
      </div>
    );
  }
}

export default App;
