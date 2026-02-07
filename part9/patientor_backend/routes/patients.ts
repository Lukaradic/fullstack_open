import express from "express";
import type { Request, Response } from "express";
import z from "zod";
import {
  EntryRequestType,
  PatinetRequestBody,
  ResponsePatientType,
} from "../types";
import {
  createEntry,
  createPatient,
  getAll,
  getById,
} from "../service/patients";
import { validateEntryRequest } from "../util";

const router = express.Router();

router.get(
  "",
  (_: Request, res: Response<ResponsePatientType[] | { message: string }>) => {
    try {
      const data = getAll();
      res.status(200).json(data);
    } catch (err) {
      if (err instanceof Error) res.status(400).json({ message: err?.message });
    }
  },
);

router.post(
  "",
  (
    req: Request<object, object, PatinetRequestBody>,
    res: Response<ResponsePatientType | { message: string }>,
  ) => {
    try {
      const responseData = createPatient(req.body);
      res.status(201).json(responseData);
    } catch (error) {
      if (error instanceof Error)
        res.status(400).json({ message: error?.message });
    }
  },
);

router.get("/:id", (req: Request<{ id: string }>, res) => {
  try {
    const { id } = req.params;
    const patient = getById(id);
    res.status(200).json(patient);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err?.message });
  }
});

router.post("/:id/entries", (req: EntryRequestType, res: Response) => {
  try {
    const entry = req.body;
    const { id: patientId } = req.params;

    if (!patientId) {
      throw new Error("No patient id provided");
    }
    validateEntryRequest(entry);
    const responseEntry = createEntry(patientId, entry);
    res.status(200).send({ success: true, data: responseEntry });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err?.message });
    if (err instanceof z.ZodError) {
      console.error(err.issues);
    }
  }
});
export default router;
