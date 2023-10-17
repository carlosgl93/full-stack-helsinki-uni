import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../features/auth/authSlice";
import {
  resetNotification,
  setNotification,
} from "../features/notification/notificationSlice";
import { clearBlogs } from "../features/blogs/blogs";

export const LogoutController = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearBlogs());
    dispatch(
      setNotification({
        message: "Logged out",
        severity: "info",
      }),
    );

    setTimeout(() => {
      navigate("/");
    }, 1000);

    setTimeout(() => {
      resetNotification();
    }, 5000);
  };

  return {
    handleLogout,
  };
};
