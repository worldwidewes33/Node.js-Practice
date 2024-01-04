const express = require("express");

const app = express();

// Two middlewares that log to the console
// app.use((req, res, next) => {
//   console.log("In the first middleware");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("In the second middleware");
//   res.send("<h1>All middlewares complete</h1>");
// });

app.use("/users", (req, res, next) => {
  res.send("<h1>Welcome to the users page</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Welcome to the homepage!</h1>");
});
app.listen(3000);
