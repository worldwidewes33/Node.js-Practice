const http = require("http");
const fs = require("fs");
let productData;

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/overview" || url === "/") {
    console.log(productData);
    res.end("This is the OVERVIEW");
  } else if (url === "/products") {
    res.end("This is the PRODUCTS");
  } else if (url === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, (err, data) => {
      const productData = JSON.parse(data);
      console.log(productData);

      res.writeHead(200, { "Content-type": "application/json" });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("Page not found");
  }
});

server.listen(3000);
