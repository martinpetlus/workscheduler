import React, { PropTypes } from 'react';

import Header from './Header';

function App({ children }) {
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

export default App;
