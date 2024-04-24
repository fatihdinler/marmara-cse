import java.util.Collections;
import java.util.PriorityQueue;

public class MaxHeapWithRemovals {
	
	public static Result findMaxAfterRemovals(int[] array) {
		long startTime = System.nanoTime();
		
		PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
		for (int num : array) {
			maxHeap.add(num);
		}
		
		int removals = array.length / 2;
		while (removals-- > 0) {
			maxHeap.poll();
		}
		
		int maxElement = maxHeap.peek();
		
		long endTime = System.nanoTime();
		long durationInNanoseconds = endTime - startTime;
		long durationInMillis = durationInNanoseconds / 1_000_000;
		
		return new Result(maxElement, durationInMillis, durationInNanoseconds);
	}
	
	public static class Result {
		public final int maxElement;
		public final long timeElapsedMillis;
		public final long timeElapsedNanoseconds;
		
		public Result(int maxElement, long timeElapsedMillis, long timeElapsedNanoseconds) {
			this.maxElement = maxElement;
			this.timeElapsedMillis = timeElapsedMillis;
			this.timeElapsedNanoseconds = timeElapsedNanoseconds;
		}
	}
}
