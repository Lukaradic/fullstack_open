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

export const HealthCheckRatingOptions = [
  {
    key: "Healthy",
    value: HealthCheckRating.Healthy,
  },
  {
    key: "LowRisk",
    value: HealthCheckRating.LowRisk,
  },
  {
    key: "HighRisk",
    value: HealthCheckRating.HighRisk,
  },
  {
    key: "CriticalRisk",
    value: HealthCheckRating.CriticalRisk,
  },
];
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
  employerName: string;
}

export interface HospitalEntryType extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntryType;

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

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormBody = UnionOmit<Entry, "id">;
