import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
//mobx
import { Provider } from 'mobx-react';
import rootStore from './mobx/rootStore';

ReactDOM.render(
  (<Provider {...rootStore}>
    <App />
  </Provider>),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
