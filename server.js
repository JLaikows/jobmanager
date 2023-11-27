const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Successful response.");
});

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Job Manager ran successfully on port ${port}`)
);
