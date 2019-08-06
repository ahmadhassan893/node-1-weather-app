const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode.js");
const forcast = require("./utils/forcast.js");

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");
const partialsPath = path.join(__dirname, "../templetes/partials");

const app = express();
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    slogun: "The Best Place To Find Weather."
  });
});

app.get("/help", (req, res) => {
  res.render("about", {
    name: "Ahmad hassan",
    title: "Help"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Ahmad hassan",
    title: "About"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must Provide An Address."
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forcast(latitude, longitude, (error, data) => {
        /* console.log("Error:", error);
      console.log("Location:", location);
      console.log("data:", data); */
        if (error) {
          res.send({
            error
          });
        }
        res.send({
          location,
          data
        });
      });
    }
  );

  /* res.send({
    forcast: "its snowing",
    location: req.query.address
  }); */
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "You must provide a search term."
    });
  } else {
    res.send({
      products: []
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help Artical Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "404 Page Not Found"
  });
});

app.listen(3000, () => {
  console.log("Server is on up to port 3000");
});
