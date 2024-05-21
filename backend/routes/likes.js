import express from "express";
import { createLike, deleteLike } from "../actions/like.js";
const router = express.Router();

router.post("/:quoteId", async (req, res) => {
  try {
    const like = await createLike(req.body, Number(req.params.quoteId));
    res.status(200).send(like);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:likeId", async (req, res) => {
  try {
    await deleteLike(Number(req.params.likeId));
    res.status(200).send(`Like number: ${req.params.likeId} as been deleted`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
