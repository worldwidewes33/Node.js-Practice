const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/overview" || url === "/") {
    res.end("This is the OVERVIEW");
  } else if (url === "/products") {
    res.end("This is the PRODUCTS");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("Page not found");
  }
});

server.listen(3000);
