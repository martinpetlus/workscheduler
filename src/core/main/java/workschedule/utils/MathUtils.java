package workschedule.utils;

import java.util.Random;

public final class MathUtils {
    private static final Random random = new Random();

    private MathUtils() {}

    public static int randomInt(final int min, final int max) {
        return random.nextInt(max - min + 1) + min;
    }
}
