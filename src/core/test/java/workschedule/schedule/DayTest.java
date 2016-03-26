package workschedule.schedule;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

public final class DayTest {

    @Test
    public void tuesdayShouldFollowMonday() {
        assertEquals(Day.TUESDAY, Day.MONDAY.following());
    }

    @Test
    public void wednesdayShouldFollowTuesday() {
        assertEquals(Day.WEDNESDAY, Day.TUESDAY.following());
    }

    @Test
    public void thursdayShouldFollowWednesday() {
        assertEquals(Day.THURSDAY, Day.WEDNESDAY.following());
    }

    @Test
    public void fridayShouldFollowThursday() {
        assertEquals(Day.FRIDAY, Day.THURSDAY.following());
    }

    @Test
    public void saturdayShouldFollowFriday() {
        assertEquals(Day.SATURDAY, Day.FRIDAY.following());
    }

    @Test
    public void sundayShouldFollowSaturday() {
        assertEquals(Day.SUNDAY, Day.SATURDAY.following());
    }

    @Test
    public void mondayShouldFollowSunday() {
        assertEquals(Day.MONDAY, Day.SUNDAY.following());
    }
}
