import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { login } from "../../services/auth";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetNotification,
  setNotification,
} from "../../features/notification/notificationSlice";
import { setUser } from "../../features/auth/authSlice";

export const LoginController = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();
  console.log(loading, userInfo, error, success);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo?.token) {
      navigate("/");
      dispatch(
        setNotification({
          message:
            "You are already logged in. If you want to log out, go to Profile > Log out",
          severity: "info",
        }),
      );
    } else return;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));
      console.log(result);
      dispatch(
        setNotification({
          message: `Welcome back ${result.payload.data.name}`,
          severity: "success",
        }),
      );
      dispatch(setUser(result.payload.data));
      setEmail("");
      setPassword("");
      Cookies.set("userToken", result.payload.data.token);
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
      navigate("/");
    } catch (error) {
      console.log("error login in", error);
      dispatch(
        setNotification({
          message: error.message,
          severity: "error",
        }),
      );
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };

  return {
    handleSubmit,
    loading,
    userInfo,
    error,
    success,
    navigate,
    dispatch,
    email,
    setEmail,
    password,
    setPassword,
  };
};
