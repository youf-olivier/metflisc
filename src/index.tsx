import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import App from './App';

if (process.env.REACT_APP_MOCK_ENABLED === 'true') {
  // eslint-disable-next-line global-require
  const { worker } = require('mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorkerRegistration.register();
