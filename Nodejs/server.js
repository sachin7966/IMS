const express = require("express");
const cors = require("cors");

const router = require("./router");
const bodyParser = require("body-parser");

// create server
const server = express();

// config to handle localhost client req e.g. react
server.use(cors());

// this with product value with req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(router);

server.all("*", (req, res) => {
  res.json("Invalid Path");
});

// this will run server
server.listen(1920, (error) => {
  if (error) console.log(error);
  else console.log("server is running");
});
