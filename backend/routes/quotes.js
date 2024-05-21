const express = require("express");
const router = express.Router();

// quotes

router.get("/all", (req, res) => {
  res.send("get quotes");
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

module.exports = router;
