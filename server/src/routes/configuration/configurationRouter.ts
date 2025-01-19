import express from "express";
import getConfiguration from "../../services/configuration/configurationService";
const router = express.Router();

router.get("/", (req, res) => {
  const config = getConfiguration();

  res.status(200).json(config);
});

export default router;
