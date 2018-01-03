const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server.log");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintence.hbs");
// });

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Welcome",
    welcomeMessage: "This page is serve with express and hbs handlebars."
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  console.log(req);
  res.send({
    errorMessage: "Unable to fulfill the request."
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
