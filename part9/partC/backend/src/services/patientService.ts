import patientsData from "../../patientsData";
import { NewPatientEntry, Patient } from "../types";

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatientsData = (): Omit<Patient, "ssn">[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry) => {
  const newPatient = {
    id: Math.floor(Math.random() * 1000000).toString(),
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientsData,
  getPatientById
};
