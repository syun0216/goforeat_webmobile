import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//font awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
<<<<<<< HEAD


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      document.getElementById('root')
    )
  });
}
=======
>>>>>>> 41f2b9c670d3e83b365bb66d25077eff1d1dcda0
