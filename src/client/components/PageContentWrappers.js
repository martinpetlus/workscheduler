import styled from 'styled-components';

const BaseWrapper = styled.div`
  padding-top: ${props => props.theme.headerHeight}px;
`;

export const WithSidebar = BaseWrapper.extend`
  margin-left: ${props => props.theme.sidebarWidth}px;
  padding-left: 10px;
  padding-right: 10px
`;

export const WithoutSidebar = BaseWrapper.extend`
  width: 700px;
  margin: 0 auto;
`;
