package workscheduler.utils;

import java.util.Random;

public final class MathUtils {
  private MathUtils() {}

  private static final Random random = new Random();

  public static int randomInt(final int min, final int max) {
    return random.nextInt(max - min + 1) + min;
  }
}
