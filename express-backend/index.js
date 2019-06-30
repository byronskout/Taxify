const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./model/User");
const PORT = 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoDbConnectionString =
"mongodb+srv://testUser:test@cluster0-xctlt.mongodb.net/test?retryWrites=true&w=majority";

app.get("/users", (req, res) => {
  res.send("You fetched a user!");
});

app.post("/users", async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  await user.save();
  res.send("You saved a user!");
})

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
