package workschedule.schedule.fitnesses;

import workschedule.schedule.options.ScheduleOptions;
import workschedule.schedule.ScheduleProperties;

abstract class AbstractFitness implements Fitness {
  protected final ScheduleProperties props;

  protected final ScheduleOptions opts;

  protected AbstractFitness(final ScheduleProperties props) {
    this.props = props;
    this.opts = this.props.getOpts();
  }
}
