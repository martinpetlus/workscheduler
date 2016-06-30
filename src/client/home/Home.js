import React from 'react';
import AppBar from 'material-ui/AppBar';
import { pure } from 'recompose';

import WorkSchedule from './WorkSchedule';

export function Home() {
  return (
    <div>
      <AppBar title="Home" />
      <WorkSchedule />
    </div>
  );
}

export default pure(Home);
