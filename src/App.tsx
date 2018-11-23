import * as React from 'react';
import './App.css';
//font awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';
import Route from './router/index';


class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Route/>
      </div>
    );
  }
}

export default App;
