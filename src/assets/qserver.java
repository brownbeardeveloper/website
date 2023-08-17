public class Server implements Runnable {

    protected volatile boolean keepProcessing = true;
    protected ServerSocket serverSocket;
    protected static final int DEFAULT_TIMEOUT = 100000;
    protected ExecutorService executor = Executors.newCachedThreadPool();

    public Server(int port) throws IOException {
        serverSocket = new ServerSocket(port);
        serverSocket.setSoTimeout(DEFAULT_TIMEOUT);
    }

    @Override
    public void run() {
        while (keepProcessing) {
            try {
                Socket socket = serverSocket.accept();
                System.out.println("client accepted");
                executor.execute(new HttpRequest(socket));
            } catch (Exception e) {
            }
        }
        closeIgnoringException(serverSocket);
    }

    protected void closeIgnoringException(ServerSocket serverSocket) {
        if (serverSocket != null) {
            try {
                serverSocket.close();
            } catch (IOException ignore) {
            }
        }
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newCachedThreadPool();
        try {
            executor.execute(new WebServer(6789));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

final class HttpRequest implements Runnable {

    final static String CRLF = "\r\n";
    private Socket socket;

    public HttpRequest(Socket socket) {
        this.socket = socket;
    }

    public void run() {
        try {
            processRequest();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private void processRequest() throws Exception {
        DataOutputStream os = new DataOutputStream(socket.getOutputStream());
        BufferedReader br = new BufferedReader(new InputStreamReader(socket
            .getInputStream()));
        String requestLine = br.readLine();

        System.out.println();
        System.out.println(requestLine);

        List<String> tokens = Arrays.asList(requestLine.split(" "));
        Iterator<String> it = tokens.iterator();
        it.next(); // skip over the method, which should be "GET"
        String fileName = it.next();

        fileName = "." + fileName;

        FileInputStream fis = null;
        boolean fileExists = true;
        try {
            fis = new FileInputStream(fileName);
        } catch (FileNotFoundException e) {
            fileExists = false;
        }

        String statusLine = null;
        String contentTypeLine = null;
        String entityBody = null;
        String contentType = null;
        if (fileExists) {
            statusLine = "HTTP/1.0 200 OK";
            contentType = contentType(fileName);
            contentTypeLine = "Content-type: " + contentType + CRLF;
        } else {
            statusLine = "HTTP/1.0 404 NOT FOUND";
            contentType = "text/html";
            contentTypeLine = "Content-type: " + contentType + CRLF;
            entityBody = "<HTML>" + "<HEAD><TITLE>Not Found</TITLE></HEAD>"
                + "<BODY>" + statusLine + " Not Found</BODY></HTML>";
        }

        os.writeBytes(statusLine);
        os.writeBytes(contentTypeLine);
        os.writeBytes(CRLF);

        if (fileExists) {
            sendBytes(fis, os);
            fis.close();
        } else {
            os.writeBytes(entityBody);
        }

        String headerLine = null;
        while ((headerLine = br.readLine()).length() != 0) {
            System.out.println(headerLine);
        }
        os.close();
        br.close();
        socket.close();
    }


    private static void sendBytes(InputStream fis, DataOutputStream os)
            throws Exception {
        byte[] buffer = new byte[1024];
        int bytes = 0;

        while ((bytes = fis.read(buffer)) != -1) {
            os.write(buffer, 0, bytes);
        }
    }

    private static String contentType(String fileName) {
        if (fileName.endsWith(".htm") || fileName.endsWith(".html")) {
            return "text/html";
        }
        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        }
        if (fileName.endsWith(".gif")) {
            return "image/gif";
        }
        if (fileName.endsWith(".txt")) {
            return "text/plain";
        }
        if (fileName.endsWith(".pdf")) {
            return "application/pdf";
        }
        return "application/octet-stream";
    }
}