public class QuickSelect {
	
	public static Result findMedian(int[] array) {
		long startTime = System.nanoTime();
		int n = array.length;
		int medianIndex = (int) Math.ceil(n / 2.0) - 1;
		int median = iterativeQuickSelect(array, 0, n - 1, medianIndex);
		
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(median, durationInMillis, durationInNanoseconds);
	}
	
	private static int iterativeQuickSelect(int[] array, int low, int high, int k) {
		while (low <= high) {
			int pivotIndex = partition(array, low, high);
			if (pivotIndex == k) {
				return array[k];
			} else if (pivotIndex > k) {
				high = pivotIndex - 1;
			} else {
				low = pivotIndex + 1;
			}
		}
		return array[k];
	}
	
	private static int partition(int[] array, int low, int high) {
		int pivot = array[low];
		int i = low + 1;
		for (int j = low + 1; j <= high; j++) {
			if (array[j] < pivot) {
				swap(array, i, j);
				i++;
			}
		}
		swap(array, low, i - 1);
		return i - 1;
	}
	
	public static class Result {
		public final int median;
		public final long timeElapsedMillis;
		public final long timeElapsedNanoseconds;
		
		public Result(int median, long timeElapsedMillis, long timeElapsedNanoseconds) {
			this.median = median;
			this.timeElapsedMillis = timeElapsedMillis;
			this.timeElapsedNanoseconds = timeElapsedNanoseconds;
		}
	}
	
	protected static void swap(int[] array, int i, int j) {
		int temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
