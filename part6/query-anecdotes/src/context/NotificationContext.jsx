import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return (state = `Anecdote "${action.payload.content}" was upvoted`);
    case "CREATE":
      return (state = `Anecdote "${action.payload.content}" was created`);
    case "TOO_SHORT":
      return (state =
        "Anecdote is too short, must have at least 5 characters long");
    case "ERROR_GENERIC":
      return (state = "Oops, there was an unexpected error");
    case "RESET":
      return (state = "");
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const resetNotification = (dispatchNotification) => {
  setTimeout(() => {
    dispatchNotification({
      type: "RESET",
    });
  }, 5000);
};

export default NotificationContext;
