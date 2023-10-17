import { Alert, Snackbar } from "@mui/material";

export const Notification = ({ open, message, severity }) => {
  return (
    <Snackbar id="notification" open={open} autoHideDuration={6000}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};
