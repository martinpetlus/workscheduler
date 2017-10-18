import React from 'react';
import { compose } from 'recompose';

import withWindowTitle from 'components/withWindowTitle';

const HomePage = () => (
  <div>Hello World!!!</div>
);

export default compose(
  withWindowTitle('Home')
)(HomePage);
