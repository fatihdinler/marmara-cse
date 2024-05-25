import java.util.*;

public class Main {
	public static void main(String[] args) {
		String[] inputFiles = {"test-input-1.txt", "test-input-2.txt", "test-input-3.txt", "test-input-4.txt"};
		String[] outputFiles = {"test-output-1.txt", "test-output-2.txt", "test-output-3.txt", "test-output-4.txt"};
		
		for (int i = 0; i < inputFiles.length; i++) {
			List<City> cities = FileIO.readInput(inputFiles[i]);
			if (cities == null) {
				System.out.println("Error reading input file: " + inputFiles[i]);
				continue;
			}
			
			// Perform the 2-TSP algorithm here
			TwoTSP.solveTwoTSP(cities, outputFiles[i]);
		}
	}
}