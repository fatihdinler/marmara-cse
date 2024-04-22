import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class FileHandler {
	
	public static void writeFile(int[] array, String filename) throws IOException {
		FileWriter writer = new FileWriter(filename);
		for (int j : array) {
			writer.write(j + "\n");
		}
		writer.close();
	}
	
	public static int[] readFile(String filePath) throws IOException {
		ArrayList<Integer> list = new ArrayList<>();
		try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
			String line;
			while ((line = reader.readLine()) != null) {
				list.add(Integer.parseInt(line.trim()));
			}
		}
		return list.stream().mapToInt(i -> i).toArray();
	}
}
