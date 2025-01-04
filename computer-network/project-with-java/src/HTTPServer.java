import java.io.*;
import java.net.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class HTTPServer {
	private final int port;
	private final ExecutorService threadPool;
	
	public HTTPServer(int port, int maxThreads) {
		this.port = port;
		this.threadPool = Executors.newFixedThreadPool(maxThreads);
	}
	
	public void start() throws IOException {
		ServerSocket serverSocket = new ServerSocket(port);
		System.out.println("HTTP Server is running on port " + port);
		
		while (true) {
			Socket clientSocket = serverSocket.accept();
			threadPool.execute(() -> handleClient(clientSocket));
		}
	}
	
	private void handleClient(Socket clientSocket) {
		try (BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream())); PrintWriter out = new PrintWriter(clientSocket.getOutputStream())) {
			
			String requestLine = in.readLine();
			System.out.println("Request: " + requestLine);
			
			if (requestLine == null || !requestLine.startsWith("GET")) {
				sendErrorResponse(out, 501, "Not Implemented");
				return;
			}
			
			String[] parts = requestLine.split(" ");
			if (parts.length < 2) {
				sendErrorResponse(out, 400, "Bad Request");
				return;
			}
			
			String uri = parts[1].substring(1); // Remove leading '/'
			try {
				int size = Integer.parseInt(uri);
				if (size < 100 || size > 20000) {
					sendErrorResponse(out, 400, "Bad Request");
					return;
				}
				
				String document = generateHtmlContent(size);
				out.println("HTTP/1.1 200 OK");
				out.println("Content-Type: text/html");
				out.println("Content-Length: " + document.length());
				out.println();
				out.print(document);
			} catch (NumberFormatException e) {
				sendErrorResponse(out, 400, "Bad Request");
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private String generateHtmlContent(int size) {
		StringBuilder content = new StringBuilder();
		content.append("<html><head><title>Response</title></head><body>");
		while (content.length() < size) {
			content.append("a ");
		}
		content.append("</body></html>");
		return content.substring(0, size);
	}
	
	private void sendErrorResponse(PrintWriter out, int statusCode, String message) {
		out.println("HTTP/1.1 " + statusCode + " " + message);
		out.println("Content-Type: text/plain");
		out.println();
		out.println(message);
	}
	
	public static void main(String[] args) throws IOException {
		if (args.length != 2) {
			System.out.println("Usage: java HTTPServer <port> <maxThreads>");
			return;
		}
		
		int port = Integer.parseInt(args[0]);
		int maxThreads = Integer.parseInt(args[1]);
		HTTPServer server = new HTTPServer(port, maxThreads);
		server.start();
	}
}
