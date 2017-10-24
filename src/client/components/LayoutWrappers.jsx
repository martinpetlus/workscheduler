import React from 'react';
import styled from 'styled-components';

import Sidebar from 'containers/Sidebar';

const BaseWrapper = styled.div`
  padding-top: ${props => props.theme.headerHeight}px;
`;

const WithSidebar = BaseWrapper.extend`
  margin-left: ${props => props.theme.sidebarWidth}px;
  padding-left: 10px;
  padding-right: 10px
`;

const WithoutSidebar = BaseWrapper.extend`
  width: 700px;
  margin: 0 auto;
`;

export const withSidebar = BaseComponent => props => [
  <Sidebar key={0} />,
  <WithSidebar key={1} >
    <BaseComponent {...props} />
  </WithSidebar>,
];


export const withoutSidebar = BaseComponent => props => (
  <WithoutSidebar>
    <BaseComponent {...props} />
  </WithoutSidebar>
);

