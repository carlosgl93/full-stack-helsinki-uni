import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { registerUser } from "../../services/auth";
import {
  resetNotification,
  setNotification,
} from "../../features/notification/notificationSlice";
import { setUser } from "../../features/auth/authSlice";

export const SignupController = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      dispatch(
        setNotification({
          message: "Passwords dont match",
          severity: "error",
        }),
      );
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
      return;
    }
    try {
      const result = await dispatch(registerUser({ name, email, password }));

      const error = result?.error;
      const { data, status } = result.payload;

      if (error) throw new Error(error.message);

      if (status === 201) {
        setName("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
        dispatch(
          setNotification({
            message: `${data.message}. Welcome ${data.user._doc.name}`,
            severity: "success",
          }),
        );
        dispatch(setUser(data.user));
        Cookies.set("userToken", data.user.token);
        navigate("/");
        setTimeout(() => {
          dispatch(resetNotification());
        }, 5000);
      }
    } catch (error) {
      console.log("error registering", error);
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
    email,
    name,
    password,
    confirmPassword,
    setEmail,
    setName,
    setPassword,
    setConfirmPassword,
  };
};
