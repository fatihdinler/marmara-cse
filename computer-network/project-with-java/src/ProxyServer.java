import java.io.*;
import java.net.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ProxyServer {
  private final int proxyPort;
  private final String webServerHost;
  private final int webServerPort;
  private final ExecutorService threadPool;

  public ProxyServer(int proxyPort, String webServerHost, int webServerPort, int maxThreads) {
    this.proxyPort = proxyPort;
    this.webServerHost = webServerHost;
    this.webServerPort = webServerPort;
    this.threadPool = Executors.newFixedThreadPool(maxThreads);
  }

  public void start() throws IOException {
    ServerSocket serverSocket = new ServerSocket(proxyPort);
    System.out.println("Proxy Server is running on port " + proxyPort);

    while (true) {
      Socket clientSocket = serverSocket.accept();
      threadPool.execute(() -> handleClient(clientSocket));
    }
  }

  private void handleClient(Socket clientSocket) {
    try (BufferedReader in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
         PrintWriter out = new PrintWriter(clientSocket.getOutputStream())) {

      String requestLine = in.readLine();
      System.out.println("Request: " + requestLine);

      if (requestLine == null || !requestLine.startsWith("GET")) {
        sendErrorResponse(out, 400, "Bad Request");
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
        if (size > 9999) {
          sendErrorResponse(out, 414, "Request-URI Too Long");
          return;
        }

        String response = forwardToWebServer(uri);
        out.print(response);
      } catch (NumberFormatException e) {
        sendErrorResponse(out, 400, "Bad Request");
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private String forwardToWebServer(String uri) throws IOException {
    try (Socket webSocket = new Socket(webServerHost, webServerPort);
         PrintWriter out = new PrintWriter(webSocket.getOutputStream());
         BufferedReader in = new BufferedReader(new InputStreamReader(webSocket.getInputStream()))) {

      out.println("GET /" + uri + " HTTP/1.1");
      out.println("Host: " + webServerHost + ":" + webServerPort);
      out.println();
      out.flush();

      StringBuilder response = new StringBuilder();
      String line;
      while ((line = in.readLine()) != null) {
        response.append(line).append("\n");
      }
      return response.toString();
    }
  }

  private void sendErrorResponse(PrintWriter out, int statusCode, String message) {
    out.println("HTTP/1.1 " + statusCode + " " + message);
    out.println("Content-Type: text/plain");
    out.println();
    out.println(message);
  }

  public static void main(String[] args) throws IOException {
    if (args.length != 4) {
      System.out.println("Usage: java ProxyServer <proxyPort> <webServerHost> <webServerPort> <maxThreads>");
      return;
    }

    int proxyPort = Integer.parseInt(args[0]);
    String webServerHost = args[1];
    int webServerPort = Integer.parseInt(args[2]);
    int maxThreads = Integer.parseInt(args[3]);
    ProxyServer proxy = new ProxyServer(proxyPort, webServerHost, webServerPort, maxThreads);
    proxy.start();
  }
}
