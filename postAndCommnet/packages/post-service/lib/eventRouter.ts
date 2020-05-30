import { Router } from "express";

const eventRouter = Router();

eventRouter.post("", (req, res) => {
  res.end();
});

export { eventRouter };
