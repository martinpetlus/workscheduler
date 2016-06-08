import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';

import Header from '../Header';
import styles from './styles.scss';

export function App({ children }) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CSSModules(App, styles);
