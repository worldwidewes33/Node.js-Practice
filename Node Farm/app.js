const http = require("http");
const fs = require("fs");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const cardTemplate = fs
  .readFileSync(`${__dirname}/templates/template-card.html`)
  .toString();

const overiewTemplate = fs
  .readFileSync(`${__dirname}/templates/template-overview.html`)
  .toString();
const products = JSON.parse(data);

const productCards = products.map((product) => {
  let template = cardTemplate;
  template = template.replaceAll(/{%IMAGE%}/g, product.image);
  template = template.replaceAll(/{%PRODUCT_NAME%}/g, product.productName);
  template = template.replaceAll(/{%QUANTITY%}/g, product.quantity);
  template = template.replaceAll(/{%PRICE%}/g, product.price);
  if (!product.organic) {
    template = template.replaceAll(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return template;
});

console.log(productCards[0]);

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/overview" || url === "/") {
    overviewTemplate = overiewTemplate.replaceAll(
      /{%PRODUCT_CARDS%}/g,
      productCards.reduce((accum, curr) => accum + curr, "")
    );
    res.setHeader("Content-type", "text/html");
    res.end(overviewTemplate);
  } else if (url === "/products") {
    res.end("This is the PRODUCTS");
  } else if (url === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("Page not found");
  }
});

server.listen(3000);
