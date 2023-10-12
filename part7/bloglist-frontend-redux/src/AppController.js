import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useLoginQuery } from "./services/auth";
import { setUser } from "./features/auth/authSlice";
import {
  resetNotification,
  setNotification,
} from "./features/notification/notificationSlice";

export const AppController = () => {
  const {
    show: showNotif,
    message,
    severity,
  } = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const token = Cookies.get("userToken");
  const { error, data } = useLoginQuery(token);
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
      dispatch(
        setNotification({
          message: `Welcome back ${data.user.name}`,
          severity: "success",
        }),
      );
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  }, [data]);

  return {
    showNotif,
    message,
    severity,
  };
};
