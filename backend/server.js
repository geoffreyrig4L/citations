const express = require("express");
const app = express();
const port = 3030;

const quotes = require("./routes/quotes");
//const user = require("./routes/users");

app.use(express.json());

app.use("/quote", quotes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
