const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const mongoDbConnectionString = require("./config/mongodb");
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRouter);

mongoose
.connect(mongoDbConnectionString, {useNewUrlParser: true})
.then(result => {
  console.log("Connected to MongoDb");
  app.listen(PORT, () => {
    console.log("Server is listening on PORT:" + PORT)
  });
})
.catch(err => {
  console.log(err);
})
