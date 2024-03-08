import patientsData from "../../patientsData";
import { Patient } from "../types";

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

const addPatient = () => {
  return null;
};

export default {
  getEntries,
  addPatient,
  getNonSensitivePatientsData
};
