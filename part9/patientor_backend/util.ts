import { EntryRequestBody, Patient, ResponsePatientType } from "./types";
import z from "zod";

const PatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.string(),
  occupation: z.string(),
});
export const validatePatientRequestBody = (
  patient: unknown,
): Omit<Patient, "id" | "entries"> => {
  try {
    const newPatient = PatientSchema.parse(patient);
    return newPatient;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Failed to create new patient with following errors: ${error?.issues?.map(
          (issue) => `${issue.message}, `,
        )}`,
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
    entries: patient.entries,
  };
};

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
  employerName: z.string(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]),
});

export const validateEntryRequest = (entry: EntryRequestBody): void => {
  switch (entry.type) {
    case "HealthCheck":
      HealthCheckEntrySchema.parse(entry);
      break;
    case "OccupationalHealthcare":
      OccupationalHealthcareEntrySchema.parse(entry);
      break;
    case "Hospital":
      HospitalEntrySchema.parse(entry);
      break;
    default:
      throw new Error("No type provided");
  }
};
