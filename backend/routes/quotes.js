import express from "express";
import { getAllQuote } from "../actions/quote.js";
const router = express.Router();

// quotes

router.get("/all", async (req, res) => {
  const quotes = await getAllQuote();
  res.status(200).send(quotes);
});

router.get("/:idQuote", (req, res) => {
  res.send("get one quote");
});

router.post("/", (req, res) => {
  res.send("post quote");
});

router.patch("/:idQuote", (req, res) => {
  res.send("update quote");
});

router.delete("/:idQuote", (req, res) => {
  res.send("delete quote");
});

export default router;
