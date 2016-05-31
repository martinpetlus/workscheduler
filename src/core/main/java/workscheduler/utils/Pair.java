package workscheduler.utils;

public final class Pair<T> {
  public final T one;

  public final T two;

  private Pair(final T one, final T two) {
    this.one = one;
    this.two = two;
  }

  public static <E> Pair<E> of(final E one, final E two) {
    return new Pair<E>(one, two);
  }
}
