const http = require("http");

const users = ["Wesley", "Alexa", "Brady"];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // write a simple form with a text input and a submit button
    res.write(`<html>
    <body>
    <form action="/create-user" method="POST">
    <input type="text" name="username" placeholder="Enter Username"/>
    <button type="submit">Submit</button>
    </form>
    </body>
    </html>`);
  } else if (url === "/users") {
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    // Write all usernames in a list item element
    for (let user of users) {
      res.write(`<li>${user}</li>`);
    }
    res.write("</ul>");
    res.write("</body>");
    res.end("</html>");
  } else if (url === "/create-user" && method === "POST") {
    const body = [];

    // collect the data chunks into an array
    req.on("data", (chunk) => body.push(chunk));

    // Parse the body of the request
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];

      users.push(username);

      // redirect to the /users route
      res.writeHead(303, { Location: "/users" });
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("Page Not Found");
  }
});

server.listen(8000);
