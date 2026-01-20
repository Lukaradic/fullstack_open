import express, { Request, Response } from "express";
import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const router = express.Router();

router.get("/hello", (_, res) => {
  res.send("Hello Full Stack");
});

interface ExerciseBody {
  daily_exercises: number[];
  target: number;
}
interface BmiParams {
  height: string;
  weight: string;
}

router.get(
  "/bmi",
  (req: Request<object, object, object, BmiParams>, res: Response) => {
    const { height, weight } = req?.query || {};

    if (!height || !weight) {
      res.status(404).json({ error: "Bad request, malformatter parameters" });
      return;
    }
    const bmiResponse = bmiCalculator(height, weight);

    res.json({ weight, height, bmi: bmiResponse });
  }
);

router.post(
  "/exercises",
  (req: Request<object, object, ExerciseBody>, res: Response) => {
    console.log(req.body);
    const { daily_exercises, target } = req.body || {};

    if (!Array.isArray(daily_exercises)) {
      res
        .status(404)
        .json({ error: "Bad request, provide valid daily exercises array" });
    }

    if (!target) {
      res.status(404).json({ error: "Bad request, provide valid target" });
    }

    const responseData = exerciseCalculator(daily_exercises, target);

    res.status(200).json({ ok: true, data: responseData });
  }
);
export default router;
