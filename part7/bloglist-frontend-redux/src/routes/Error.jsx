import { Link, useNavigate, useRouteError } from "react-router-dom";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const Error = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const error = useRouteError();
  console.log(error);

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 6000);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Typography variant="h2">
        Oops, something went wrong please try again later
      </Typography>
      <hr />
      <Snackbar open={open} autoHideDuration={5000}>
        <Alert severity="error">
          {error.statusText || error.message}
          <Link to="..">Go back</Link>
          <Button onClick={handleClose}>Close</Button>
        </Alert>
      </Snackbar>
    </Box>
  );
};
