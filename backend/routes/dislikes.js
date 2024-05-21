import express from "express";
import { createDislike, deleteDislike } from "../actions/dislike.js";
const router = express.Router();

router.post("/:quoteId", async (req, res) => {
  try {
    const dislike = await createDislike(req.body, Number(req.params.quoteId));
    res.status(200).send(dislike);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:dislikeId", async (req, res) => {
  try {
    await deleteDislike(Number(req.params.dislikeId));
    res
      .status(200)
      .send(`Dislike number: ${req.params.dislikeId} as been deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
