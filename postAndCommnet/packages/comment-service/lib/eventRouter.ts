import { Router } from "express";

const eventRouter = Router();

eventRouter.post("", (req, res) => {
  console.log(req.body);
  res.end();
});

export { eventRouter };
