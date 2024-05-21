import express from "express";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = 3030;

import quotes from "./routes/quotes.js";
import users from "./routes/users.js";
import likes from "./routes/likes.js";
import dislikes from "./routes/dislikes.js";

app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());

app.use("/quote", quotes);
app.use("/user", users);
app.use("/like", likes);
app.use("/dislike", dislikes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
