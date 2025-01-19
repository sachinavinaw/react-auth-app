import express, { Router, Request, Response } from "express";
import getForms from "../../services/forms/formsService";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const forms = getForms(req.body.type || "INDIVIDUAL");

  res.status(200).json({
    message: "",
    data: forms,
  });
});

export default router;
