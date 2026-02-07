import { v4 as uuidv4 } from "uuid";
import data from "../data/patients";
import { Entry, EntryRequestBody, Patient, PatinetRequestBody } from "../types";
import { removeSsnFromPatient, validatePatientRequestBody } from "../util";

const patients: Patient[] = data.map((patient) => {
  return { ...patient };
});

export const getAll = () => {
  return patients.map((patient) => {
    return { ...removeSsnFromPatient(patient) };
  });
};

export const createPatient = (data: PatinetRequestBody) => {
  const parsedData = validatePatientRequestBody(data);
  const id = uuidv4();
  const newPatient: Patient = { ...parsedData, id, entries: [] };
  patients.push(newPatient);
  return removeSsnFromPatient(newPatient);
};

export const getById = (id: string) => {
  const filteredPatient = patients.find((patient) => patient.id === id);

  if (!filteredPatient) {
    throw new Error("Patient with id: " + id + " not found");
  }

  return filteredPatient;
};

export const createEntry = (
  patientId: string,
  entry: EntryRequestBody,
): Entry => {
  const patient = patients.find((el) => el.id === patientId);

  if (patient === undefined) {
    throw new Error(`Patient with id of: ${patientId} not found`);
  }
  const newEntry = { ...entry, id: uuidv4() };

  patient.entries.push(newEntry);
  return newEntry;
};
