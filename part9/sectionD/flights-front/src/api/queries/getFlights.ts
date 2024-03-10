import axios, { AxiosResponse } from "axios";
import { Diary } from "../../types";
import { flightsApi } from "../diaries";

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const GET_FLIGHTS = async () => {
  try {
    const response: AxiosResponse<Diary[]> = await flightsApi.get<Diary[]>("/diaries/withComments");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw new Error(error.response?.data.message);
    }
    return [];
  }
};
