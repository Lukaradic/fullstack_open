import { Patient, ResponsePatientType } from "./types";
import z from "zod";

const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.string(),
  occupation: z.string(),
});
export const validatePatientRequestBody = (
  patient: unknown
): Omit<Patient, "id"> => {
  try {
    const newPatient = PatientSchema.parse(patient);
    return newPatient;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Failed to create new patient with following errors: ${error?.issues?.map(
          (issue) => `${issue.message}, `
        )}`
      );
    }
    throw new Error("Failed to create new patient");
  }
};

export const removeSsnFromPatient = (patient: Patient): ResponsePatientType => {
  return {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };
};
