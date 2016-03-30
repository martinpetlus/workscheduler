package workschedule.schedule;

import java.util.Iterator;

public interface ResettableIterator<E> extends Iterator<E> {

    public void reset();
}
