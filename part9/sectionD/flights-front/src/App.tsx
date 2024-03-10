import { useMutation, useQuery, useQueryClient } from "react-query";
import { GET_FLIGHTS } from "./api/queries/getFlights";
import { Diary } from "./types";
import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../../flight-diary/src/types";
import { POST_FLIGHTS } from "./api/queries/postFlight";
import { AxiosError } from "axios";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [newDiaryEntry, setNewDiaryEntry] = useState<NewDiaryEntry>({
    date: "",
    visibility: "" as Visibility,
    comment: "",
    weather: "" as Weather
  });

  const client = useQueryClient();

  const { data, isLoading, error } = useQuery<Diary[]>("diaries", () => GET_FLIGHTS(), {
    onError: err => setErrorMessage((err as AxiosError).message)
  });

  const {
    mutate,
    error: mutationError,
    isLoading: mutateLoading
  } = useMutation((newDiary: NewDiaryEntry) => POST_FLIGHTS(newDiary), {
    onError: error => {
      setErrorMessage((error as AxiosError).message);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: "diaries" });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(newDiaryEntry);
  };

  if (isLoading || mutateLoading) return <p>Loading...</p>;

  return (
    <>
      <h1>Flight Diaries</h1>
      {error ||
        (mutationError && (
          <div
            style={{
              padding: "1rem",
              backgroundColor: "red",
              color: "white"
            }}
          >
            {errorMessage}
          </div>
        ))}
      <h3>Add an entry:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <input
          type="text"
          name="comment"
          id="comment"
          onChange={e => {
            setNewDiaryEntry(prev => {
              return {
                ...prev,
                comment: e.target.value
              };
            });
          }}
        />
        <br />
        <label htmlFor="date">Date:</label>

        <input
          type="date"
          name="date"
          id="date"
          onChange={e => {
            setNewDiaryEntry(prev => {
              return {
                ...prev,
                date: e.target.value
              };
            });
          }}
        />
        <br />
        <label htmlFor="visibility">Visibility:</label>

        <select
          name="visibility"
          id="visibility"
          onChange={e => {
            setNewDiaryEntry(prev => {
              return {
                ...prev,
                visibility: e.target.value as Visibility
              };
            });
          }}
        >
          {Object.values(Visibility).map(visibility => (
            <option key={visibility}>{visibility}</option>
          ))}
        </select>
        <br />
        <label htmlFor="weather">Weather:</label>

        <select
          name="weather"
          id="weather"
          onChange={e => {
            setNewDiaryEntry(prev => {
              return {
                ...prev,
                weather: e.target.value as Weather
              };
            });
          }}
        >
          {Object.values(Weather).map(weather => (
            <option key={weather}>{weather}</option>
          ))}
        </select>
        <br />

        <button type="submit">Submit</button>
      </form>
      <h3>Diaries upto this date:</h3>
      {data?.map(diary => (
        <div key={diary.id}>
          <b>{diary.date}</b>
          <p>{diary.visibility}</p>
          <p>{diary.comment}</p>
        </div>
      ))}
    </>
  );
}

export default App;
