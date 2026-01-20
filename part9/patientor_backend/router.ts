import express from "express";
import type { Request, Response } from "express";

import diagnosisData from "./data/diagnoses";
import patientsData from "./data/patients";
import { Diagnosis, Patient, ResponsePatientType } from "./types";
import { removeSsnFromPatient, validatePatientRequestBody } from "./util";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/api/ping", (_: Request, res: Response) => {
  res.send("pong");
});

router.get("/api/diagnosis", (_: Request, res: Response<Diagnosis[]>) => {
  res.status(200).json(diagnosisData);
});

router.get(
  "/api/patients",
  (_: Request, res: Response<ResponsePatientType[]>) => {
    const data: ResponsePatientType[] = patientsData.map((patient) => {
      return removeSsnFromPatient(patient);
    });
    res.status(200).json(data);
  }
);

router.post(
  "/api/patients",
  (
    req: Request<object, object, Patient>,
    res: Response<ResponsePatientType | { message: string }>
  ) => {
    try {
      const parsedData = validatePatientRequestBody(req.body);
      const id = uuidv4();
      patientsData.push({ ...parsedData, id });
      const responseData = removeSsnFromPatient({ ...parsedData, id });
      res.status(201).json(responseData);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ message: error?.message });
    }
  }
);

export default router;
