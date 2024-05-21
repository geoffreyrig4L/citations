import express from "express";
import { signIn, signUp } from "../actions/user.js";
const router = express.Router();

// users

router.post("/signin", async (req, res) => {
  try {
    const user = await signIn(req.body?.username);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await signUp(req.body?.username);
    res.status(200).send(user);
  } catch (error) {
    if (error.message.match("Unique constraint")) {
      res.status(401).send(error.message);
    } else {
      res.status(400).send(error.message);
    }
  }
});

export default router;
