import express from "express";
import type { Request, Response } from "express";
import { Diagnosis } from "../types";
import { getByCode } from "../service/diagnosis";

const router = express.Router();

router.get(
  "/:code",
  (
    req: Request<{ code: string }>,
    res: Response<{ data: Diagnosis } | { message: string }>,
  ) => {
    try {
      const { code } = req.params;

      if (!code) {
        throw new Error("Invalid requrest, code is needed");
      }
      const data = getByCode(req.params.code);
      res.status(200).send({ data });
    } catch (err) {
      let message = "";
      if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Something went wrong";
      }
      res.status(400).send({ message });
    }
  },
);

export default router;
