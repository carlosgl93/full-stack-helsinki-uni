import Router from "./routes/Router";
import { Container } from "@mui/material";
import { Nav, Notification } from "./components";
import { useSelector } from "react-redux";

const App = () => {
  const {
    show: showNotif,
    message,
    severity,
  } = useSelector((state) => state.notification);

  return (
    <>
      <Nav />
      <Container
        sx={{
          ml: {
            xs: "1vw",
            sm: "240px",
          },
        }}
      >
        <Router />
        {showNotif && (
          <Notification
            message={message}
            open={showNotif}
            severity={severity}
          />
        )}
      </Container>
    </>
  );
};

export default App;
