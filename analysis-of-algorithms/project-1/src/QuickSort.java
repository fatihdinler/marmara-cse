public class QuickSort {
	
	public static Result sortAndFindMedian(int[] array) {
		long startTime = System.nanoTime();
		iterativeQuickSort(array, 0, array.length - 1);
		double median = findMedian(array);
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(median, durationInMillis, durationInNanoseconds);
	}
	
	private static void iterativeQuickSort(int[] array, int low, int high) {
		int[] stack = new int[high - low + 1];
		int top = -1;
		stack[++top] = low;
		stack[++top] = high;
		
		while (top >= 0) {
			high = stack[top--];
			low = stack[top--];
			
			int p = partition(array, low, high);
			if (p - 1 > low) {
				stack[++top] = low;
				stack[++top] = p - 1;
			}
			if (p + 1 < high) {
				stack[++top] = p + 1;
				stack[++top] = high;
			}
		}
	}
	
	private static int partition(int[] array, int low, int high) {
		int pivot = array[low];
		int i = low;
		for (int j = low + 1; j <= high; j++) {
			if (array[j] < pivot) {
				i++;
				swap(array, i, j);
			}
		}
		swap(array, low, i);
		return i;
	}
	
	private static void swap(int[] array, int i, int j) {
		int temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	
	private static double findMedian(int[] array) {
		int middleIndex = (int) Math.ceil(array.length / 2.0) - 1;
		return array[middleIndex];
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
