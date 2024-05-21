import express from "express";
import {
  createQuote,
  deleteQuote,
  getAllQuote,
  getQuote,
  updateQuote,
} from "../actions/quote.js";
const router = express.Router();

// quotes

router.get("/all", async (req, res) => {
  try {
    const quote = await getAllQuote();
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:idQuote", async (req, res) => {
  try {
    const quote = await getQuote(Number(req.params.idQuote));
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const quote = await createQuote(req.body);
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:idQuote", async (req, res) => {
  try {
    const quote = await updateQuote(Number(req.params.idQuote), req.body);
    res.status(200).send(quote);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:idQuote", async (req, res) => {
  try {
    await deleteQuote(Number(req.params.idQuote));
    res.status(200).send(`Quote number: ${req.params.idQuote} as been deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
