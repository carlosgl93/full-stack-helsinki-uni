import { useContext } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, voteAnecdote } from "./requests/anecdotes";
import {
  resetNotification,
  useNotificationDispatch,
} from "./context/NotificationContext";

const App = () => {
  const queryClient = useQueryClient();

  const dispatchNotification = useNotificationDispatch();

  const voteMutation = useMutation({
    mutationKey: ["voteAnecdote"],
    mutationFn: voteAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries("anecdotes");
      dispatchNotification({
        type: "VOTE",
        payload: data,
      });
      resetNotification(dispatchNotification);
    },
  });

  const handleVote = (anecdote) => {
    console.log("vote");
    const upvotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate(upvotedAnecdote);
  };

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return (
      <p>
        Anecdotes service is not available due to problems in the server{" "}
        {error.message}
      </p>
    );
  }

  const sortedDataByVotes = data.sort((a, b) => b.votes - a.votes);
  console.log(sortedDataByVotes);
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {sortedDataByVotes.map(({ id, content, votes }) => (
        <div key={id}>
          <div>{content}</div>
          <div>
            has {votes}
            <button
              style={{
                marginLeft: "5px",
              }}
              onClick={() => handleVote(anecdote)}
            >
              votes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
