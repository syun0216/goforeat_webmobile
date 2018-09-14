import React, { Component } from 'react';
import Route from '@/router';
import '@/styles/transition.less';

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
