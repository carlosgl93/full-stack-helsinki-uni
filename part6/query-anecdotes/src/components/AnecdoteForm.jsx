import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAnecdotes } from "../requests/anecdotes";
import {
  resetNotification,
  useNotificationDispatch,
} from "../context/NotificationContext";
import { useEffect } from "react";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const { isError, isSuccess, mutate } = useMutation({
    mutationFn: postAnecdotes,
    onSuccess: (data) => {
      console.log("succeed", data.content);
      queryClient.invalidateQueries("anecdotes");
      dispatchNotification({
        type: "CREATE",
        payload: data,
      });
      resetNotification(dispatchNotification);
    },
    onError: (error) => {
      switch (error.message) {
        case "Anecdotes must be atleast 5 chars long":
          dispatchNotification({
            type: "TOO_SHORT",
          });
          break;
        default:
          dispatchNotification({
            type: "ERROR_GENERIC",
          });
      }
      resetNotification(dispatchNotification);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    console.log(content);
    if (content.length === 0) return;
    mutate(content);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
