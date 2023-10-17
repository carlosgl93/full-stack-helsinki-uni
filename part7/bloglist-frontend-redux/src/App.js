import Router from "./routes/Router";
import { Container } from "@mui/material";
import { Nav, Notification } from "./components";
import { AppController } from "./AppController";

const App = () => {
  const { showNotif, message, severity } = AppController();

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
