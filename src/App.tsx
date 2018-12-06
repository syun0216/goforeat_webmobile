import * as React from 'react';
//style
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';
//route
import Route from './router/index';


const TestContext = React.createContext('light');
class App extends React.Component<any,any> {
  public render() {
    return (
      <div className="App">
        <Route/>
      </div>
    );
  }
}

export default App;
