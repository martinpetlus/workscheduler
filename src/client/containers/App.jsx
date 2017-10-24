import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';

const App = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
