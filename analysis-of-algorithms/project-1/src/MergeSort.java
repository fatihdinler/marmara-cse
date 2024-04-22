public class MergeSort {
	
	public static Result sortAndFindMedian(int[] array) {
		long startTime = System.nanoTime();
		
		mergeSort(array, 0, array.length - 1);
		
		double median = findMedian(array);
		
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(median, durationInMillis, durationInNanoseconds);
	}
	
	private static void mergeSort(int[] array, int left, int right) {
		if (left < right) {
			int mid = (left + right) / 2;
			mergeSort(array, left, mid);
			mergeSort(array, mid + 1, right);
			merge(array, left, mid, right);
		}
	}
	
	private static void merge(int[] array, int left, int mid, int right) {
		int[] leftArray = new int[mid - left + 1];
		int[] rightArray = new int[right - mid];
		
		System.arraycopy(array, left, leftArray, 0, leftArray.length);
		System.arraycopy(array, mid + 1, rightArray, 0, rightArray.length);
		
		int i = 0, j = 0;
		int k = left;
		while (i < leftArray.length && j < rightArray.length) {
			if (leftArray[i] <= rightArray[j]) {
				array[k] = leftArray[i];
				i++;
			} else {
				array[k] = rightArray[j];
				j++;
			}
			k++;
		}
		
		while (i < leftArray.length) {
			array[k] = leftArray[i];
			i++;
			k++;
		}
		while (j < rightArray.length) {
			array[k] = rightArray[j];
			j++;
			k++;
		}
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
