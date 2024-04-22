public class InsertionSort {
	public static Result sortAndFindMedian(int[] array) {
		long startTime = System.nanoTime();
		
		for (int i = 1; i < array.length; i++) {
			int current = array[i];
			int j = i - 1;
			while (j >= 0 && array[j] > current) {
				array[j + 1] = array[j];
				j--;
			}
			array[j + 1] = current;
		}
		
		double median = findMedian(array);
		
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(median, durationInMillis, durationInNanoseconds);
	}
	
	private static double findMedian(int[] array) {
		int middle = array.length / 2;
		if (array.length % 2 == 0) {
			return (array[middle - 1] + array[middle]) / 2.0;
		} else {
			return array[middle];
		}
	}
	
	public static class Result {
		public final double median;
		public final long timeElapsedMillis;
		public final long timeElapsedNanoseconds;
		
		public Result(double median, long timeElapsedMillis, long timeElapsedNanoseconds) {
			this.median = median;
			this.timeElapsedMillis = timeElapsedMillis;
			this.timeElapsedNanoseconds = timeElapsedNanoseconds;
		}
	}
}