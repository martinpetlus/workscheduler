import React from 'react';
import { pure } from 'recompose';

import CreateSchedule from './CreateSchedule';

export function Schedule() {
  return (
    <CreateSchedule />
  );
}

export default pure(Schedule);
