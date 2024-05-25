import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class TwoTSP {
	public static void solveTwoTSP(List<City> cities, String outputFile) {
		if (cities.size() < 2) {
			return;
		}
		
		// Step 1: Use Farthest Points Heuristic to find two initial cities
		City[] initialCities = findFarthestCities(cities);
		
		// Step 2: Divide cities into two groups for each salesman
		Set<City> visitedCities = new HashSet<>();
		visitedCities.add(initialCities[0]);
		visitedCities.add(initialCities[1]);
		
		List<City> salesman1Cities = findTour(initialCities[0], cities, visitedCities, cities.size() / 2);
		List<City> salesman2Cities = findTour(initialCities[1], cities, visitedCities, cities.size() - salesman1Cities.size());
		
		// Step 3: Calculate tour lengths
		int tourLength1 = calculateTourLength(salesman1Cities);
		int tourLength2 = calculateTourLength(salesman2Cities);
		
		int totalLength = tourLength1 + tourLength2;
		
		// Step 4: Write output
		FileIO.writeOutput(outputFile, totalLength, tourLength1, salesman1Cities, tourLength2, salesman2Cities);
	}
	
	private static City[] findFarthestCities(List<City> cities) {
		City city1 = null;
		City city2 = null;
		double maxDistance = -1;
		for (City c1 : cities) {
			for (City c2 : cities) {
				double distance = c1.distanceTo(c2);
				if (distance > maxDistance) {
					maxDistance = distance;
					city1 = c1;
					city2 = c2;
				}
			}
		}
		return new City[]{city1, city2};
	}
	
	private static List<City> findTour(City start, List<City> cities, Set<City> visitedCities, int maxCities) {
		List<City> tour = new ArrayList<>();
		City currentCity = start;
		tour.add(currentCity);
		
		while (tour.size() < maxCities) {
			City nearestCity = null;
			double shortestDistance = Double.MAX_VALUE;
			
			for (City city : cities) {
				if (!visitedCities.contains(city)) {
					double distance = currentCity.distanceTo(city);
					if (distance < shortestDistance) {
						shortestDistance = distance;
						nearestCity = city;
					}
				}
			}
			
			if (nearestCity != null) {
				tour.add(nearestCity);
				visitedCities.add(nearestCity);
				currentCity = nearestCity;
			} else {
				break;  // No more unvisited cities
			}
		}
		
		return tour;
	}
	
	private static int calculateTourLength(List<City> cities) {
		int length = 0;
		for (int i = 0; i < cities.size() - 1; i++) {
			length += cities.get(i).distanceTo(cities.get(i + 1));
		}
		length += cities.get(cities.size() - 1).distanceTo(cities.get(0));
		return length;
	}
}
