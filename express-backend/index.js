const express = require("express");
const mongoose = require("mongoose");
const PORT = 4000;
const app = express();

const mongoDbConnectionString =
"mongodb+srv://testUser:test@cluster0-xctlt.mongodb.net/test?retryWrites=true&w=majority";

mongoose
.connect(mongoDbConnectionString, {useNewUrlParser: true})
.then(result => {
  console.log("Connected to MongoDb");
})
.catch(err => {
  console.log(err);
})

app.get("/user", (req, res) => {
  res.send("You fetched a user!")
});

app.listen(PORT, () => {
  console.log("Server is listening on PORT:" + PORT)
});
