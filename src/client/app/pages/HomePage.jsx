import React from 'react';
import { compose } from 'recompose';

import withWindowTitle from 'components/withWindowTitle';

const HomePage = () => (
  <h2>Home</h2>
);

export default compose(withWindowTitle('Home'))(HomePage);
