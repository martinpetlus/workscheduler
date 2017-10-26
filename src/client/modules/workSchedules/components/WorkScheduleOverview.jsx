import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
  border: 2px solid #efefef;
  padding: 5px;
`;

const Name = styled.h4`
  margin: 5px 0;
`;

const WorkScheduleOverview = ({ name }) => (
  <Box>
    <Name>{name}</Name>
  </Box>
);

WorkScheduleOverview.propTypes = {
  name: PropTypes.string.isRequired,
};

export default WorkScheduleOverview;
