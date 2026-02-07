import type { Request } from "express";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  employerName: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type ResponsePatientType = Omit<Patient, "ssn">;

export type PatinetRequestBody = Omit<Patient, "entries" | "id">;

export type EntryRequestBody = UnionOmit<Entry, "id">;
export type EntryRequestType = Request<
  { id: string },
  object,
  EntryRequestBody
>;
