import express, { Request, Response } from "express";
import { bmiCalculator } from "./bmiCalculator";

const router = express.Router();

router.get("/hello", (_, res) => {
  res.send("Hello Full Stack");
});

interface BmiParams {
  height: string;
  weight: string;
}

router.get("/bmi", (req: Request<{}, {}, {}, BmiParams>, res: Response) => {
  const { height, weight } = req?.query || {};

  if (!height || !weight) {
    res.status(404).json({ error: "Bad request, malformatter parameters" });
    return;
  }
  const bmiResponse = bmiCalculator(height, weight);

  res.json({ weight, height, bmi: bmiResponse });
});

export default router;
