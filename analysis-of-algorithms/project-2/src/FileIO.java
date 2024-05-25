import java.io.*;
import java.util.*;

public class FileIO {
	public static List<City> readInput(String inputFile) {
		List<City> cities = new ArrayList<>();
		
		try (BufferedReader br = new BufferedReader(new FileReader(inputFile))) {
			String line;
			while ((line = br.readLine()) != null) {
				String[] parts = line.split("\\s+");
				int id = Integer.parseInt(parts[0]);
				int x = Integer.parseInt(parts[1]);
				int y = Integer.parseInt(parts[2]);
				cities.add(new City(id, x, y));
			}
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
		
		return cities;
	}
	
	public static void writeOutput(String outputFile, int totalLength, int tourLength1, List<City> salesman1Cities, int tourLength2, List<City> salesman2Cities) {
		try (PrintWriter writer = new PrintWriter(new File(outputFile))) {
			writer.println(totalLength);
			writer.println(tourLength1 + " " + salesman1Cities.size());
			for (City city : salesman1Cities) {
				writer.println(city.getId());
			}
			writer.println();
			writer.println(tourLength2 + " " + salesman2Cities.size());
			for (City city : salesman2Cities) {
				writer.println(city.getId());
			}
			writer.println();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
