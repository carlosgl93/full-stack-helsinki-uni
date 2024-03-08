import diagnosisData from "../../diagnosesData";
import { Diagnosis } from "../types";

const getDiagnosis = (): Diagnosis[] => {
  return diagnosisData;
};

// const getNonSensitivePatientsData = (): Omit<Patient, "ssn">[] => {
//   return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
//     id,
//     name,
//     dateOfBirth,
//     gender,
//     occupation
//   }));
// };

export default {
  getDiagnosis
};
