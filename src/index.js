import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import App from 'components/App';
import './main.scss';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
});

export default App;
