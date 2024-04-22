import java.util.Arrays;

public class QuickSelectWithMedianOfMediansApproach {
	
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
	
	public static Result findMedian(int[] array) {
		long startTime = System.nanoTime();
		int medianIndex = (int) Math.ceil(array.length / 2.0) - 1;
		int median = select(array, 0, array.length - 1, medianIndex);
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(median, durationInMillis, durationInNanoseconds);
	}
	
	private static int select(int[] array, int left, int right, int n) {
		while (left < right) {
			int pivotIndex = medianOfMedians(array, left, right);
			pivotIndex = partition(array, left, right, pivotIndex);
			if (n == pivotIndex) {
				return array[n];
			} else if (n < pivotIndex) {
				right = pivotIndex - 1;
			} else {
				left = pivotIndex + 1;
			}
		}
		return array[left];
	}
	
	private static int medianOfMedians(int[] array, int left, int right) {
		if (right - left + 1 <= 5) {
			Arrays.sort(array, left, right + 1);
			return left + (right - left) / 2;
		}
		
		for (int i = left; i <= right; i += 5) {
			int subRight = Math.min(i + 4, right);
			Arrays.sort(array, i, subRight + 1);
			int medianIndex = i + (subRight - i) / 2;
			swap(array, medianIndex, left + (i - left) / 5);
		}
		
		int mid = left + (right - left) / 10;
		return select(array, left, left + (right - left) / 5, mid);
	}
	
	private static int partition(int[] array, int left, int right, int pivotIndex) {
		int pivotValue = array[pivotIndex];
		swap(array, pivotIndex, right);
		int storeIndex = left;
		for (int i = left; i < right; i++) {
			if (array[i] < pivotValue) {
				swap(array, storeIndex, i);
				storeIndex++;
			}
		}
		swap(array, storeIndex, right);
		return storeIndex;
	}
	
	private static void swap(int[] array, int i, int j) {
		int temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}
