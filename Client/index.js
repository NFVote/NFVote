import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

// uncomment so that webpack can bundle styles
import styles from './scss/styles.scss';

render(
  <App />,
  document.getElementById('root')
);
