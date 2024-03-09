import { Gender, NewPatientEntry } from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data: " + object);
  }

  if ("name" in object && "dateOfBirth" in object && "ssn" in object && "occupation" in object && "gender" in object) {
    const { name, dateOfBirth, ssn, occupation, gender } = object;

    const newPatient: NewPatientEntry = {
      name: parseString(name),
      dateOfBirth: parseDate(dateOfBirth),
      ssn: parseString(ssn),
      occupation: parseString(occupation),
      gender: parseGender(gender)
    };
    return newPatient;
  }

  throw new Error("Incorrect or missing data: " + object);
};

const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error("Incorrect or missing string: " + string);
  }

  return string;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};
