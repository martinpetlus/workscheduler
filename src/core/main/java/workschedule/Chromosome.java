package workschedule;

public final class Chromosome {
    private final boolean[] params;

    public Chromosome(final int length) {
        params = new boolean[length];
    }

    public boolean getParam(final int index) {
        return params[index];
    }

    public void setParam(final int index, final boolean value) {
        params[index] = value;
    }
}
