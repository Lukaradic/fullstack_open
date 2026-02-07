import data from "../data/diagnoses";
import { Diagnosis } from "../types";

export const getByCode = (code: string): Diagnosis => {
  const diagnosis = data.find((el) => el.code === code);

  if (!diagnosis) {
    throw new Error(
      "Failed to get diagnosis information, code: " + code + " not found",
    );
  }

  return diagnosis;
};
