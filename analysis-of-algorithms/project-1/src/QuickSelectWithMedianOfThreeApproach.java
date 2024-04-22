public class QuickSelectWithMedianOfThreeApproach {
	
	public static Result findMedian(int[] array) {
		long startTime = System.nanoTime();
		int n = array.length;
		int medianIndex = (int) Math.ceil(n / 2.0) - 1;
		int median = quickSelect(array, 0, n - 1, medianIndex);
		
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(median, durationInMillis, durationInNanoseconds);
	}
	
	private static int quickSelect(int[] array, int low, int high, int k) {
		while (low <= high) {
			int pivotIndex = medianOfThreePartition(array, low, high);
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
	
	private static int medianOfThreePartition(int[] array, int low, int high) {
		int middle = low + (high - low) / 2;
		int pivotIndex = medianOfThree(array, low, middle, high);
		swap(array, low, pivotIndex); // Place the median at the start
		
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
	
	private static int medianOfThree(int[] array, int low, int middle, int high) {
		int a = array[low], b = array[middle], c = array[high];
		if ((a - b) * (c - a) >= 0) return low;
		else if ((b - a) * (c - b) >= 0) return middle;
		else return high;
	}
	
	private static void swap(int[] array, int i, int j) {
		int temp = array[i];
		array[i] = array[j];
		array[j] = temp;
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
}
