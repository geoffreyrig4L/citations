import express from "express";
const app = express();
const port = 3030;

import quotes from "./routes/quotes.js";
//const user = require("./routes/users");

app.use(express.json());

app.use("/quote", quotes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
