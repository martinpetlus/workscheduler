/* global APP_NAME */
import React from 'react';
import Helmet from 'react-helmet';

export default (title) => (BaseComponent) => (props) => (
  <div>
    <Helmet>
      <title>{`${APP_NAME} - ${title}`}</title>
    </Helmet>
    <BaseComponent {...props} />
  </div>
);
