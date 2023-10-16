import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/login";
import { AuthContext } from "../../state/auth";
import { SEVERITY, UiContext } from "../../state/ui";
import { User } from "../../types";

const LoginController = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateUserState } = useContext(AuthContext);
  const { toggleToast } = useContext(UiContext);

  const { isLoading, data, mutate, isSuccess } = useMutation({
    mutationFn: () => login({ email, password }),
    onSuccess: (data: User) => {
      updateUserState(data);
      toggleToast(SEVERITY.SUCCESS, `Welcome back ${data.name}`);
    },
    onError: (error) =>
      toggleToast(SEVERITY.ERROR, `There was an error login in ${error}`),
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      mutate();
      if (isSuccess) {
        // updateUserState(loginMutation.data);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("error login in", error);
    }
  };
  return {
    email,
    password,
    isLoading,
    data,
    handleSubmit,
    setEmail,
    setPassword,
  };
};

export default LoginController;
