import express from "express";

const router = express.Router();
import configurationRouter from "./configuration/configurationRouter";
import formsRouter from "./forms/formsRouter";

router.get("/", (req, res) => {
  res.status(200).json({ message: "Keep-alive" });
});

router.use("/web-config", configurationRouter);
router.use("/forms", formsRouter);

export default router;
