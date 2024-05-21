import express from "express";
import { approved, unapproved } from "../actions/approvement.js";
const router = express.Router();

router.post("/:user1/:user2", async (req, res) => {
  try {
    const approve = await approved(
      Number(req.params.user1),
      Number(req.params.user2)
    );
    res.status(200).send(approve);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:user1/:user2", async (req, res) => {
  try {
    await unapproved(Number(req.params.user1), Number(req.params.user2));
    res.status(200).send(`UnApproved user`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
