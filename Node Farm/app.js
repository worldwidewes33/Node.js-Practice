const http = require("http");
const fs = require("fs");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);

// Templates
const cardTemplate = fs
  .readFileSync(`${__dirname}/templates/template-card.html`)
  .toString();

const overviewTemplate = fs
  .readFileSync(`${__dirname}/templates/template-overview.html`)
  .toString();
const products = JSON.parse(data);

const productCards = products.map((product) => {
  return replaceTemplate(cardTemplate, product);
});

const server = http.createServer((req, res) => {
  const baseURL = `http://${req.headers.host}`;
  const url = new URL(req.url, baseURL);

  if (url.pathname === "/overview" || url.pathname === "/") {
    const overview = overviewTemplate.replaceAll(
      /{%PRODUCT_CARDS%}/g,
      productCards.join("")
    );
    res.setHeader("Content-type", "text/html");
    res.end(overview);
  } else if (url.pathname === "/product") {
    res.end("This is the PRODUCT");
  } else if (url.pathname === "/api") {
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

function replaceTemplate(template, product) {
  let output = template.replaceAll(/{%IMAGE%}/g, product.image);
  output = output.replaceAll(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replaceAll(/{%QUANTITY%}/g, product.quantity);
  output = output.replaceAll(/{%PRICE%}/g, product.price);
  if (!product.organic) {
    output = output.replaceAll(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  output = output.replaceAll(/{%FROM%}/g, product.from);
  output = output.replaceAll(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replaceAll(/{%ID%}/g, product.id);
  output = output.replaceAll(/{%DESCRIPTION%}/g, product.description);

  return output;
}
