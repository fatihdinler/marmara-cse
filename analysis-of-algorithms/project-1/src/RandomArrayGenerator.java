import java.util.Random;

public class RandomArrayGenerator {
	public static int[] generateRandomArray(int size) {
		Random random = new Random();
		int[] array = new int[size];
		for (int i = 0; i < size; i++) {
			array[i] = random.nextInt(10001);
		}
		return array;
	}
}