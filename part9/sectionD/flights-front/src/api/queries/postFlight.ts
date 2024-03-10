import { NewDiaryEntry } from "../../../../flight-diary/src/types";
import { Diary } from "../../types";
import { flightsApi } from "../diaries";

export const POST_FLIGHTS = async (newDiary: NewDiaryEntry) => {
  const result = await flightsApi.post<Diary[]>("/diaries", {
    ...newDiary
  });
  return result.data;
};
